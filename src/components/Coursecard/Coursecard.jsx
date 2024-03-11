import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Coursecard = (courseId) => {
    return (
        <main className="cursor-pointer">
            <Link to={`/course/${courseId}`} state={{ courseId }}>
                Course {courseId}
            </Link>
        </main>
    );
}

export default Coursecard