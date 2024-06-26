import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuizEditForm from "../components/QuizEditForm";
import { backend } from "../url";

const QuizEditPage = () => {
  const { id } = useParams();

  const [quiz, setQuiz] = useState({});

  const getQuiz = async () => {
    const res = await axios.get(
      `${backend}/quiz/${id}`,
    );

    console.log(res.data);
    setQuiz(res.data);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <div>
      <QuizEditForm quiz={quiz} />
    </div>
  );
};

export default QuizEditPage;
