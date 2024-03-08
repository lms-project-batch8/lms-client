import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

const Menu = ({ openQuizes, openCourses }) => {
    return (
        <div className="menu mt-4">
            <div className="item">
                <div
                    className="flex flex-row p-3 pl-8 gap-2 items-center hover:bg-light-white rounded-md"
                    onClick={() => openCourses()}
                >
                    <FaBookOpen color="white" />
                    <span className="listItemTitle text-white">Courses</span>
                </div>

                <div
                    className={`flex flex-row p-3 pl-8 gap-2 items-center hover:bg-light-white rounded-md`}
                    onClick={() => openQuizes()}
                >
                    <FaPen color="white" />
                    <span className="listItemTitle text-white">Quizes</span>
                </div>
            </div>
            <div className="item absolute bottom-0 left-0 right-0">
                <Link to="/logout">
                    <div className="flex flex-row p-3 pl-8 gap-2 items-center  hover:bg-light-white rounded-md">
                        <RiLogoutBoxLine color="white" />
                        <span className="listItemTitle text-white">Logout</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
