import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const QuizLanding = () => {
  const [quiz, setQuiz] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getQuiz = async () => {
      const res = await axios.get(
        `https://lms-server-tktv.onrender.com/quiz/${id}`,
      );
      console.log(res.data);
      setQuiz(res.data);
    };

    getQuiz();
  }, []);

  return (
    <div
      className='flex justify-center items-center h-screen bg-cover bg-center'
      style={{ backgroundImage: `url('your-background-image-url-here')` }}
    >
      <div className='bg-white bg-opacity-75 rounded-lg p-8 shadow-lg'>
        <h1 className='text-3xl font-bold mb-4'>{quiz.title}</h1>
        <p className='mb-4'>
          This a Quiz of{" "}
          <span>
            {quiz.duration_minutes} minutes. Do not Change the tab while
            attempting and do not engage in any malpractices. All the Best.{" "}
          </span>
        </p>
        <p className='font-semibold mb-6'>Duration: {quiz.duration_minutes}</p>
        <Link to={`/quiz/${id}/start`}>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizLanding;
