import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Question from "../../components/Question/Question";
import Timer from "../Timer/Timer";
import "./Quiz.css";
import QuizResultsDialog from "../../pages/QuizResultsDialog";
import { useSelector } from "react-redux";

const Quiz = () => {
  const [quiz, setQuiz] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [userAnswers, setUserAnswers] = useState({});
  const [marksObtained, setMarksObtained] = useState(0);
  const [marks, setMarks] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleAnswerChange = (questionId, selectedOptionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptionId,
    }));
  };

  const checkAnswersAndCalculateMarks = (quiz, userAnswers) => {
    let totalMarks = 0;
    let totalPossibleMarks = 0;

    quiz.questions.forEach((ques) => {
      const userSelectedOption = userAnswers[ques.question_id]
        ? ques.options.find(
            (option) =>
              option.option_id === parseInt(userAnswers[ques.question_id]),
          )
        : null;

      let quesMarks = ques.question_marks;
      totalPossibleMarks += quesMarks;

      if (
        userSelectedOption &&
        userSelectedOption.option_text === ques.correct_ans
      ) {
        totalMarks += quesMarks;
      }
    });

    setMarksObtained(totalMarks);
    setMarks(totalPossibleMarks);
  };

  useEffect(() => {
    const getQuiz = async () => {
      const res = await axios.get(
        `https://lms-server-tktv.onrender.com/quiz/${id}`,
      );
      console.log("Quiz Data:", res.data);
      setQuiz(res.data);
    };

    getQuiz();
  }, [id]);

  useEffect(() => {
    if (open) {
      // Call handleMarksSubmit only after marksObtained is updated and dialog is opened
      handleMarksSubmit(marksObtained);
    }
  }, [marksObtained, open]); // Add open to dependency array to ensure this runs after dialog is opened

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMarksSubmit = async (marksObtained) => {
    await axios.post(`https://lms-server-tktv.onrender.com/marks`, {
      quiz_id: quiz.quiz_id,
      user_id: user.user_id,
      marks: marksObtained,
    });
  };

  const duration = parseInt(quiz.duration_minutes || 0) * 60;

  return (
    <main className='quiz'>
      <section className='quiz__header'>
        <div className='quiz__header_title'>
          <span>{quiz.title || "Quiz"}</span>
        </div>
        <div className='quiz__timer'>
          <Timer seconds={duration} />
        </div>
      </section>
      <section className='quiz__questions'>
        {quiz.questions?.map((question, index) => (
          <Question
            key={question.question_id}
            question={question.question_text}
            options={question.options}
            questionId={question.question_id}
            onOptionSelect={handleAnswerChange}
          />
        )) || null}
      </section>
      <section
        className='quiz__submit hover:bg-[#D4E7C5]'
        onClick={() => {
          checkAnswersAndCalculateMarks(quiz, userAnswers);
          setOpen(true);
        }}
      >
        <span>Submit</span>
      </section>
      <QuizResultsDialog
        open={open}
        marks={marks}
        marksObtained={marksObtained}
      />
    </main>
  );
};

export default Quiz;
