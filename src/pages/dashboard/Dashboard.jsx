import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import React, { useState } from "react";
import Quizes from "../../components/Quizes";
import Courses from "../../components/Courses";
import Users from "../../components/Users";
import AddUsers from "../../components/Forms/AddUsers";

const Dashboard = () => {
    const [coursesOpen, setCoursesOpen] = useState(false);
    const [quizesOpen, setQuizesOpen] = useState(true);
    const [usersOpen, setUsersOpen] = useState(false);
    const [openAddUsers, setOpenAddUsers] = useState(false);

    const functionsList = [
        { func: handleQuizes, state: setQuizesOpen, value: true },
        { func: handleCourses, state: setCoursesOpen, value: true },
        { func: handleUsers, state: setUsersOpen, value: true },
        { func: handleAddUsers, state: setOpenAddUsers, value: true },
    ];

    function handleQuizes() {
        handleState(functionsList[0]);
    }

    function handleCourses() {
        handleState(functionsList[1]);
    }

    function handleState(item) {
        const newState = {};
        for (const state of functionsList) {
            state.state(state === item ? state.value : false);
        }
        Object.assign(newState, { ...newState });
    }

    function handleUsers() {
        handleState(functionsList[2]);
    }

    function handleAddUsers() {
        handleState(functionsList[3]);
    }

    return (
        <main className="overflow-hidden">
            {/* Make Navbar fixed at the top */}
            <div className="bg-dark-purple fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div className="flex">
                {/* Make Menu fixed on the side */}
                <div className={`w-[170px] h-screen bg-dark-purple fixed`}>
                    <Menu
                        openQuizes={handleQuizes}
                        openCourses={handleCourses}
                        openUsers={handleUsers}
                        openAddUsers={handleAddUsers}
                    />
                </div>
                <div className="pl-[170px] pt-[60px] overflow-auto h-screen">
                    {quizesOpen && <Quizes />}
                    {coursesOpen && <Courses />}
                    {usersOpen && <Users />}
                    {openAddUsers && <AddUsers />}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
