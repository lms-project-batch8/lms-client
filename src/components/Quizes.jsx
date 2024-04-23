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
  const isSuperUser = user.user_role.toLowerCase() === "admin";

  const getQuizzes = async () => {
    setIsLoading(true);

    const quizUrl =
      isTrainer || isSuperUser
        ? "https://lms-server-15hc.onrender.com/quiz"
        : `https://lms-server-15hc.onrender.com/assign/quiz?trainee_id=${user.user_id}`;

    console.log("Fetching quizzes from:", quizUrl);

    try {
      const response = await axios.get(quizUrl);
      const sortedQuizzes = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setQuizzes(sortedQuizzes);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
      alert("Failed to load quizzes. Check the console for more details.");
    } finally {
      setIsLoading(false);
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
