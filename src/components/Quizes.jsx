import React from "react";
import QuizCard from "./QuizCard/QuizCard";

const Quizes = () => {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <QuizCard quizId={1} />
            <QuizCard quizId={2} />
            <QuizCard quizId={3} />
            <QuizCard quizId={4} />
            <QuizCard quizId={5} />
            <QuizCard quizId={6} />
            <QuizCard quizId={7} />
            <QuizCard quizId={8} />
            <QuizCard quizId={9} />
            <QuizCard quizId={10} />
            <QuizCard quizId={11} />
            <QuizCard quizId={12} />
        </main>
    );
};

export default Quizes;
