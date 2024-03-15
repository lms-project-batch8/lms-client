import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const QuizLanding = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [quizStart, setQuizStart] = useState(false);

    return (
        <main>
            <div>QuizLanding {id}</div>
            <div>
                <Link to={`/quiz/${id}/start`}>Start Quiz</Link>
            </div>
        </main>
    );
};

export default QuizLanding;
