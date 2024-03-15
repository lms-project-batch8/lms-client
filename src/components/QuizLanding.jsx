import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const QuizLanding = () => {
  const quizTitle = "The Ultimate JavaScript Quiz";
  const quizDescription =
    "Test your JavaScript knowledge with this quiz. Covering topics from basics to advanced concepts, see where you stand in the world of JavaScript!";
  const quizDuration = "30 minutes";

  const { id } = useParams();

  const navigate = useNavigate();

  const [quizStart, setQuizStart] = useState(false);

  return (
    <div
      className='flex justify-center items-center h-screen bg-cover bg-center'
      style={{ backgroundImage: `url('your-background-image-url-here')` }}
    >
      <div className='bg-white bg-opacity-75 rounded-lg p-8 shadow-lg'>
        <h1 className='text-3xl font-bold mb-4'>{quizTitle}</h1>
        <p className='mb-4'>{quizDescription}</p>
        <p className='font-semibold mb-6'>Duration: {quizDuration}</p>
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
