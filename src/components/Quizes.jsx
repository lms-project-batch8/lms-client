import React from "react";
import QuizCard from "./QuizCard/QuizCard";

const Quizes = () => {
    return (
        <>
            <QuizCard quizId={1} />
            <QuizCard quizId={2} />
            <QuizCard quizId={3} />
            <QuizCard quizId={4} />
        </>
    );
};

export default Quizes;
