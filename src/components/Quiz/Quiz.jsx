import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Question from "../../components/Question/Question";
import Timer from "../Timer/Timer";
import "./Quiz.css";

const Quiz = () => {
  const [quiz, setQuiz] = useState({});
  const { id } = useParams();

  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerChange = (questionId, selectedOptionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptionId,
    }));
  };

  console.log(userAnswers);

  const checkAnswersAndCalculateMarks = (quiz, userAnswers) => {
    let totalMarks = 0;

    const res = quiz.questions.forEach((ques) => {
      const userSelectedOption = userAnswers[ques.question_id]
        ? ques.options.find(
            (option) =>
              option.option_id === parseInt(userAnswers[ques.question_id]),
          )
        : null;

      let marks = ques.question_marks;

      console.log(marks);

      if (userSelectedOption.option_text === ques.correct_ans) {
        totalMarks += parseInt(marks);
      }
    });

    console.log(totalMarks);
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
          const res = checkAnswersAndCalculateMarks(quiz, userAnswers);
        }}
      >
        <span>Submit</span>
      </section>
    </main>
  );
};

export default Quiz;
