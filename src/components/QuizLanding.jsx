import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const QuizLanding = () => {
    const location = useLocation();
    const { quizId } = location.state;

    const navigate = useNavigate();

    const [quizStart, setQuizStart] = useState(false);

    return (
        <main>
            <div>QuizLanding {quizId}</div>
            <div>
                <Link to={`/quiz/${quizId}/start`}>Start Quiz</Link>
            </div>
        </main>
    );
};

export default QuizLanding;
