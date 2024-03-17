import React, { useState } from "react";
import { FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { MdViewList } from "react-icons/md";

const Menu = ({
  openQuizes,
  openCourses,
  openUsers,
  openAddUsers,
  showUsers,
  showAddUsers,
}) => {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menuName, callback) => {
    setActiveMenu(menuName);
    callback();
  };

  const menuItemClass = (menuName) =>
    `flex flex-row p-3 pl-6 gap-2 items-center cursor-pointer w-full ${
      activeMenu === menuName ? "bg-light-white" : "hover:bg-light-white"
    } rounded-md`;

  return (
    <div className='menu h-full flex flex-col justify-between mt-[60px]'>
      <div>
        <div
          onClick={() => handleMenuClick("quizes", openQuizes)}
          className='item w-full'
        >
          <div className={menuItemClass("quizes")}>
            <FaQuestionCircle color='white' /> {/* Updated icon */}
            <div className='listItemTitle text-white'>Quizes</div>
          </div>
        </div>
        <div
          onClick={() => handleMenuClick("courses", openCourses)}
          className='item w-full'
        >
          <div className={menuItemClass("courses")}>
            <FaBookOpen color='white' />
            <div className='listItemTitle text-white'>Courses</div>
          </div>
        </div>
        {showUsers && (
          <div
            onClick={() => handleMenuClick("users", openUsers)}
            className='item w-full'
          >
            <div className={menuItemClass("users")}>
              <MdViewList color='white' />
              <div className='listItemTitle text-white'>Users</div>
            </div>
          </div>
        )}

        {showAddUsers && (
          <div
            onClick={() => handleMenuClick("addUsers", openAddUsers)}
            className='item w-full'
          >
            <div className={menuItemClass("addUsers")}>
              <MdGroupAdd color='white' />
              <div className='listItemTitle text-white'>Add Users</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
