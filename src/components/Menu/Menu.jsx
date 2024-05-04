import React, { useState } from "react";
import { FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { MdViewList } from "react-icons/md";
import { Menu as MuiMenu, MenuItem } from "@mui/material";

const Menu = ({
  openQuizes,
  openCourses,
  openUsers,
  openAddUsers,
  showUsers,
  isTrainer,
  openTrainees,
}) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (menuName, callback) => {
    setActiveMenu(menuName);
    if (menuName !== "users") {
      callback && callback();
    }
    setAnchorEl(null);
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
            <FaQuestionCircle color='white' className='text-xl' />
            <div className='listItemTitle text-white text-xl'>Quizes</div>
          </div>
        </div>
        <div
          onClick={() => handleMenuClick("courses", openCourses)}
          className='item w-full text-xl'
        >
          <div className={menuItemClass("courses")}>
            <FaBookOpen color='white' className='text-xl' />
            <div className='listItemTitle text-white text-xl'>Courses</div>
          </div>
        </div>
        {showUsers && (
          <div className='item w-full relative'>
            <div
              className={menuItemClass("users")}
              onClick={(e) => {
                handleMenuClick("users");
                setAnchorEl(e.currentTarget);
              }}
            >
              <MdViewList color='white' className='text-xl' />
              <div className='listItemTitle text-white text-xl'>Users</div>
            </div>
            <MuiMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                style: { width: anchorEl ? anchorEl.clientWidth : undefined },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              getContentAnchorEl={null}
            >
              <MenuItem
                onClick={() => {
                  openUsers();
                  setAnchorEl(null);
                }}
              >
                All Users
              </MenuItem>
              <MenuItem
                onClick={() => {
                  openAddUsers();
                  setAnchorEl(null);
                }}
              >
                Add User
              </MenuItem>
            </MuiMenu>
          </div>
        )}
        {isTrainer && (
          <div
            onClick={() => handleMenuClick("trainees", openTrainees)}
            className='item w-full'
          >
            <div className={menuItemClass("trainees")}>
              <MdViewList color='white' className='text-xl' />
              <div className='listItemTitle text-white text-xl'>Trainees</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
