import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard/QuizCard";
import { Link } from "react-router-dom";
import axios from "axios";

const Quizes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizzes = async () => {
      const res = await axios.get(`https://lms-server-tktv.onrender.com/quiz`);
      console.log(res);
      setQuizzes(res.data);
    };

    getQuizzes();
  }, []);

  return (
    <main className='flex flex-col'>
      <Link to={`/quiz/new`}>
        <div className='p-5'>Create A Quiz</div>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {quizzes.map((quiz, index) => (
          <QuizCard quizId={quiz.quiz_id} />
        ))}
      </div>
    </main>
  );
};

export default Quizes;
