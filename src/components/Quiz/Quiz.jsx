import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Question from "../../components/Question/Question";
import Timer from "../Timer/Timer";
import "./Quiz.css";
import QuizResultsDialog from "../../pages/QuizResultsDialog";

const Quiz = () => {
  const [quiz, setQuiz] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const [userAnswers, setUserAnswers] = useState({});

  const [marksObtained, setMarksObtained] = useState(0);
  const [marks, setMarks] = useState(0);

  const handleAnswerChange = (questionId, selectedOptionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptionId,
    }));
  };

  console.log(userAnswers);

  const checkAnswersAndCalculateMarks = (quiz, userAnswers) => {
    let totalMarks = 0;

    quiz.questions.forEach((ques) => {
      const userSelectedOption = userAnswers[ques.question_id]
        ? ques.options.find(
            (option) =>
              option.option_id === parseInt(userAnswers[ques.question_id]),
          )
        : null;

      let quesMarks = ques.question_marks;

      setMarks((prev) => prev + quesMarks);

      if (userSelectedOption.option_text === ques.correct_ans) {
        totalMarks = totalMarks + quesMarks;
      }
    });

    setMarksObtained(totalMarks);
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

  const duration = parseInt(quiz.duration_minutes || 0) * 60;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

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
