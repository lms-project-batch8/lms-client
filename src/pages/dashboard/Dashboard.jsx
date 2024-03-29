import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import React, { useState } from "react";
import Quizes from "../../components/Quizes";
import Courses from "../../components/Courses";
import Users from "../../components/Users";
import AddUsers from "../../components/Forms/AddUsers";
import { useSelector } from "react-redux";
import QuizResults from "../../components/QuizResults";

const Dashboard = () => {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [quizesOpen, setQuizesOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(false);
  const [openAddUsers, setOpenAddUsers] = useState(false);
  const [openQuizResults, setOpenQuizResults] = useState(false);
  const [quizId, setQuizId] = useState(0); // Initialize with 0 or a suitable default value

  const { user } = useSelector((state) => state.auth);

  const isSuperUser = user.user_role === "admin";

  const isTrainer = user.user_role === "trainer";

  const functionsList = [
    { func: handleQuizes, state: setQuizesOpen, value: true },
    { func: handleCourses, state: setCoursesOpen, value: true },
    { func: handleQuizResults, state: setOpenQuizResults, value: true },
    ...(isSuperUser
      ? [
          { func: handleUsers, state: setUsersOpen, value: true },
          { func: handleAddUsers, state: setOpenAddUsers, value: true },
        ]
      : []),
  ];

  function handleQuizes() {
    handleState(functionsList[0]);
  }

  function handleCourses() {
    handleState(functionsList[1]);
  }

  function handleUsers() {
    if (isSuperUser) {
      handleState(functionsList.find((item) => item.func === handleUsers));
    }
  }

  function handleAddUsers() {
    if (isSuperUser) {
      handleState(functionsList.find((item) => item.func === handleAddUsers));
    }
  }

  function handleQuizResults(quizId) {
    setQuizId(quizId); 
    handleState(functionsList.find((item) => item.func === handleQuizResults));
  }

  function handleState(item) {
    for (const state of functionsList) {
      state.state(state === item ? state.value : false);
    }
  }

  return (
    <main className='overflow-hidden z-10'>
      <div className='bg-dark-purple fixed top-0 left-0 right-0 z-10'>
        <Navbar />
      </div>
      <div className='flex'>
        <div className='w-[18%] min-w-[170px] h-screen bg-dark-purple fixed'>
          <Menu
            openQuizes={handleQuizes}
            openCourses={handleCourses}
            openUsers={handleUsers}
            openAddUsers={handleAddUsers}
            showUsers={isSuperUser}
            showAddUsers={isSuperUser}
            isTrainer={isTrainer}
          />
        </div>
        <div className='pl-[20%] min-pl-[170px] pt-[60px] overflow-auto h-screen'>
          {quizesOpen && <Quizes handleQuizResults={handleQuizResults} />}
          {coursesOpen && <Courses />}
          {isSuperUser && usersOpen && <Users />}
          {isSuperUser && openAddUsers && <AddUsers />}
          {openQuizResults && <QuizResults quizId={quizId} />}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
