import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CourseLanding = () => {
    const location = useLocation();
    const { courseId } = location.state || {}; // Provide a default empty object if location.state is undefined

    const navigate = useNavigate();

    const [courseStart, setcourseStart] = useState(false);

    return (
        <main>
            <div>CourseLanding {courseId}</div>
            <div>
                <Link to={`/course/${courseId}/start`}>Start Course</Link>
            </div>
        </main>
    );
};

export default CourseLanding;
