import React from "react";
import { FaPen, FaBookOpen } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdGroupAdd } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { MdViewList } from "react-icons/md";

const Menu = ({ openQuizes, openCourses, openUsers, openAddUsers }) => {
    return (
        <div className="menu h-full w-[200px] flex flex-col justify-between mt-[60px]">
            <div className="item">
                <div className="item bottom-0" onClick={openQuizes}>
                    <div className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md">
                        <RiLogoutBoxLine color="white" />
                        <div className="listItemTitle text-white">Quizes</div>
                    </div>
                </div>
                <div className="item bottom-0" onClick={openCourses}>
                    <div className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md">
                        <RiLogoutBoxLine color="white" />
                        <div className="listItemTitle text-white">Courses</div>
                    </div>
                </div>
                <div className="item bottom-0" onClick={openUsers}>
                    <div className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md">
                        <RiLogoutBoxLine color="white" />
                        <div className="listItemTitle text-white">Users</div>
                    </div>
                </div>
                <div className="item bottom-0" onClick={openAddUsers}>
                    <div className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md">
                        <RiLogoutBoxLine color="white" />
                        <div className="listItemTitle text-white">
                            Add Users
                        </div>
                    </div>
                </div>
                {/* <div className="item bottom-0">
                    <Link
                        to="/logout"
                        className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md"
                    >
                        <RiLogoutBoxLine color="white" />
                        <div className="listItemTitle text-white">
                            Create Quiz
                        </div>
                    </Link>
                </div> */}
                {/* <div className="item bottom-0">
                    <Link
                        to="/logout"
                        className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md"
                    >
                        <RiLogoutBoxLine color="white" />
                        <div className="listItemTitle text-white">Logout</div>
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default Menu;
