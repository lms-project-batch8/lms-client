import React, { useState } from "react";
import { FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { MdViewList } from "react-icons/md";
import { Menu as MuiMenu, MenuItem, Select } from "@mui/material"; // Import Material-UI components

const Menu = ({
  openQuizes,
  openCourses,
  openUsers,
  openAddUsers,
  showUsers,
  showAddUsers,
}) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (menuName, callback) => {
    setActiveMenu(menuName);
    if (menuName !== "users") {
      callback();
    }
    setAnchorEl(null);
  };

  const menuItemClass = (menuName) =>
    `flex flex-row p-3 pl-6 gap-2 items-center cursor-pointer w-full ${
      activeMenu === menuName ? "bg-light-white" : "hover:bg-light-white"
    } rounded-md`;

  return (
    <div className="menu h-full flex flex-col justify-between mt-[60px]">
      <div>
        <div
          onClick={() => handleMenuClick("quizes", openQuizes)}
          className="item w-full"
        >
          <div className={menuItemClass("quizes")}>
            <FaQuestionCircle color="white" />
            <div className="listItemTitle text-white">Quizes</div>
          </div>
        </div>
        <div
          onClick={() => handleMenuClick("courses", openCourses)}
          className="item w-full"
        >
          <div className={menuItemClass("courses")}>
            <FaBookOpen color="white" />
            <div className="listItemTitle text-white">Courses</div>
          </div>
        </div>
        {showUsers && (
          <div className="item w-full relative">
            <div
              className={menuItemClass("users")}
              onClick={(e) => {
                handleMenuClick("users");
                setAnchorEl(e.currentTarget);
              }}
            >
              <MdViewList color="white" />
              <div className="listItemTitle text-white">Users</div>
            </div>
            <MuiMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                style: { width: anchorEl ? anchorEl.clientWidth : undefined }, // Set width to match the menu width
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
              <MenuItem onClick={() => {openUsers(); setAnchorEl(null);}}>All Users</MenuItem>
              <MenuItem onClick={() => {openAddUsers(); setAnchorEl(null);}}>Add User</MenuItem>
            </MuiMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
