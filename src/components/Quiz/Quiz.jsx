import React, { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";
import Timer from "../Timer/Timer";
import axios from "axios";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const [quiz, setQuiz] = useState({
    quiz_id: 10,
    title: "JS Quiz",
    description: null,
    duration_minutes: 180,
    created_at: "2024-03-18T09:20:48.000Z",
    questions: [
      {
        question_id: 3,
        question_text: "what is your name?",
        question_type: null,
        created_at: "2024-03-18T09:20:48.000Z",
        options: [
          {
            option_id: 2,
            option_text: "a",
            is_correct: 1,
            created_at: "2024-03-18T09:20:48.000Z",
          },
        ]
      },
    ],
  });
  const { id } = useParams();

  useEffect(() => {
    const getQuiz = async () => {
      const res = await axios.get(
        `https://lms-server-tktv.onrender.com/quiz/${id}`,
      );
      console.log(res.data);
      setQuiz(res.data);
      console.log(quiz.duration_minutes);
    };

    getQuiz();
  }, []);

  const duration = parseInt(quiz.duration_minutes) * 60;

  return (
    <main className='quiz'>
      <section className='quiz__header'>
        <div className='quiz__header_title'>
          <span>JavaScript Quiz</span>
        </div>
        <div className='quiz__timer'>
          <Timer seconds={duration} />
        </div>
      </section>
      <section className='quiz__questions'>
        {quiz.questions.map((question) => (
          <Question question={quiz.question_text} options={quiz.options} />
        ))}
      </section>

      <section className='quiz__submit hover:bg-[#D4E7C5]'>
        <span>Submit</span>
      </section>
    </main>
  );
};

export default Quiz;
