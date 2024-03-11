import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const QuizCard = ({ quizId }) => {
    return (
        <main className="cursor-pointer">
            <Link to={`/quiz/${quizId}`} state={{ quizId }}>
                Quiz {quizId}
            </Link>
        </main>
    );
};

export default QuizCard;
