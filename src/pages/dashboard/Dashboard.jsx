import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import React, { useState } from "react";
import Quizes from "../../components/Quizes";
import Courses from "../../components/Courses";
import Users from "../../components/Users";
import AddUsers from "../../components/Forms/AddUsers";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [quizesOpen, setQuizesOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(false);
  const [openAddUsers, setOpenAddUsers] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const isSuperUser = user.user_role === "admin";

  const functionsList = [
    { func: handleQuizes, state: setQuizesOpen, value: true },
    { func: handleCourses, state: setCoursesOpen, value: true },
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

  function handleState(item) {
    for (const state of functionsList) {
      state.state(state === item ? state.value : false);
    }
  }

  console.log(user.user_role); // Should be 'admin' for admin users
  console.log(isSuperUser); // Should be true for admin users

  return (
    <main className='overflow-hidden z-10'>
      <div className='bg-dark-purple fixed top-0 left-0 right-0 z-10'>
        <Navbar />
      </div>
      <div className='flex'>
        <div className={`w-[170px] h-screen bg-dark-purple fixed`}>
          <Menu
            openQuizes={handleQuizes}
            openCourses={handleCourses}
            openUsers={handleUsers}
            openAddUsers={handleAddUsers}
            showUsers={isSuperUser} // This should be true for an admin user
            showAddUsers={isSuperUser} // This should be true for an admin user
          />
        </div>
        <div className='pl-[170px] pt-[60px] overflow-auto h-screen'>
          {quizesOpen && <Quizes />}
          {coursesOpen && <Courses />}
          {isSuperUser && usersOpen && <Users />}
          {isSuperUser && openAddUsers && <AddUsers />}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
