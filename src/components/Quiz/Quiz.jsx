import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Question from "../../components/Question/Question";
import Timer from "../Timer/Timer";
import "./Quiz.css";

const Quiz = () => {
  const [quiz, setQuiz] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getQuiz = async () => {
      const res = await axios.get(
        `https://lms-server-tktv.onrender.com/quiz/${id}`,
      );
      console.log("Quiz Data:", res.data); // Debug: Log the quiz data
      setQuiz(res.data);
    };

    getQuiz();
  }, [id]);

  // Ensure quiz.duration_minutes is a number and has a default value (e.g., 0)
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
          />
        )) || null}
      </section>
      <section className='quiz__submit hover:bg-[#D4E7C5]'>
        <span>Submit</span>
      </section>
    </main>
  );
};

export default Quiz;
