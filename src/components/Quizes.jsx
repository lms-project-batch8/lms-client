import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard/QuizCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Quizes = ({ handleQuizResults }) => {
  const [quizzes, setQuizzes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const isTrainer = user.user_role.toLowerCase() === "trainer";

  const getQuizzes = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(`https://lms-server-tktv.onrender.com/quiz`);
      const sortedQuizzes = res.data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setQuizzes(sortedQuizzes);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader open={isLoading} />
      ) : (
        <main className='flex flex-col'>
          <div className='p-5'>
            {isTrainer && (
              <Link to={`/quiz/new`}>
                <Button variant='contained'>Create A Quiz</Button>
              </Link>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {quizzes.map((quiz) => (
              <QuizCard
                quizId={quiz.quiz_id}
                handleQuizResults={handleQuizResults}
              />
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Quizes;
