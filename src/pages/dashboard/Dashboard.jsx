import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import React, { useState } from "react";
import Quizes from "../../components/Quizes";
import Courses from "../../components/Courses";

const Dashboard = () => {
    const [coursesOpen, setCoursesOpen] = useState(false);
    const [quizesOpen, setQuizesOpen] = useState(true);

    const handleQuizes = () => {
        setCoursesOpen(false);
        setQuizesOpen(true);
    };

    const handleCourses = () => {
        setCoursesOpen(true);
        setQuizesOpen(false);
    };

    return (
        <>
            <div className="bg-dark-purple">
                <Navbar />
            </div>
            <div className="flex">
                <div className={`w-[170px] h-screen bg-dark-purple`}>
                    <Menu
                        openQuizes={handleQuizes}
                        openCourses={handleCourses}
                    />
                </div>
                <div>
                    {quizesOpen && <Quizes />}
                    {coursesOpen && <Courses />}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
