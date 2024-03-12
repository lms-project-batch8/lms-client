import React from "react";
import { Link } from "react-router-dom";
import { FaPen, FaBookOpen } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdGroupAdd } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { MdViewList } from "react-icons/md";

const Menu = ({
    openQuizes,
    openCourses,
    addTrainer,
    addTrainee,
    deleteTrainer,
    deleteTrainee,
}) => {
    const menuItems = [
        {
            icon: <FaBookOpen color="white" />,
            title: "Courses",
            onClick: openCourses,
        },
        { icon: <FaPen color="white" />, title: "Quizes", onClick: openQuizes },
        {
            icon: <MdViewList color="white" />,
            title: "View Trainers",
            onclick: {},
        },
        {
            icon: <MdViewList color="white" />,
            title: "View Trainees",
            onclick: {},
        },
        {
            icon: <MdGroupAdd color="white" />,
            title: "Add Trainer",
            onClick: addTrainer,
        },
        {
            icon: <MdGroupAdd color="white" />,
            title: "Add Trainee",
            onClick: addTrainee,
        },
        {
            icon: <AiFillDelete color="white" />,
            title: "Delete Trainer",
            onClick: deleteTrainer,
        },
        {
            icon: <AiFillDelete color="white" />,
            title: "Delete Trainee",
            onClick: deleteTrainee,
        },
    ];

    return (
        <div className="menu h-full w-[200px] flex flex-col justify-between mt-[60px]">
            <div className="item">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md"
                        onClick={item.onClick}
                    >
                        {item.icon}
                        <span className="listItemTitle text-white">
                            {item.title}
                        </span>
                    </div>
                ))}
                <div className="item bottom-0">
                    <Link
                        to="/logout"
                        className="flex flex-row p-3 pl-6 gap-2 items-center hover:bg-light-white rounded-md"
                    >
                        <RiLogoutBoxLine color="white" />
                        <div className="listItemTitle text-white">Logout</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
