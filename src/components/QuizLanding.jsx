import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { backend } from "../url";
import { CircularProgress } from "@mui/material";
const QuizLanding = () => {
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getQuiz = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backend}/quiz/${id}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    getQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularProgress color='inherit' /> {/* Loading animation */}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className='flex justify-center items-center h-screen bg-cover bg-center bg-slate-300'
        style={{ backgroundImage: `url('your-background-image-url-here')` }}
      >
        <div className='bg-violet-100 bg-opacity-75 rounded-lg p-8 shadow-lg'>
          <h1 className='text-3xl font-bold mb-4'>{quiz.title}</h1>
          <p className='mb-4'>
            This is a Quiz of{" "}
            <span>
              {quiz.duration_minutes} minutes. Do not change the tab while
              attempting the quiz and do not engage in any malpractices. All the
              best.
            </span>
          </p>
          <p className='font-semibold mb-6'>
            Duration: {quiz.duration_minutes}
          </p>
          <Link to={`/quiz/${id}/start`}>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Start Quiz
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuizLanding;
