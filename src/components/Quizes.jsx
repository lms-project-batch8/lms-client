import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard/QuizCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { backend } from "../url";
import { ToastContainer, toast } from "react-toastify";

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
        ? `${backend}/quiz`
        : `${backend}/assign/quizzes?user_id=${user.user_id}`;

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
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const handleDeleteQuiz = async (deletedQuizId) => {
    try {
      await axios.delete(`${backend}/quiz/${deletedQuizId}`);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.quiz_id !== deletedQuizId),
      );
      console.log("Quiz deleted successfully!");
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                quiz={quiz}
                handleQuizResults={handleQuizResults}
                handleDeleteQuiz={handleDeleteQuiz}
              />
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Quizes;
