import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

function Course() {
  const { user } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const res = await axios.get("http://localhost:20190/courses");

      setCourses(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const isTrainer = user.user_role.toLowerCase() === "trainer";

  // const courses = [
  //   {
  //     id: 1,
  //     title: "Course 1",
  //     description: "Description of course 1",
  //     duration: "6 weeks",
  //     tutor: "Sourav Mukherjee",
  //   },
  //   {
  //     id: 2,
  //     title: "Course 2",
  //     description: "Description of course 2",
  //     duration: "8 weeks",
  //     tutor: "Sourav Mukherjee",
  //   },
  //   {
  //     id: 3,
  //     title: "Course 3",
  //     description: "Description of course 3",
  //     duration: "10 weeks",
  //     tutor: "Sourav Mukherjee",
  //   },
  // ];

  return (
    <main className='flex flex-col'>
      <div className='p-5'>
        {isTrainer && (
          <Link to={`/course/new`}>
            <Button variant='contained'>Create a Course</Button>
          </Link>
        )}
      </div>

      <div className='flex p-4 gap-10 flex-wrap h-5'>
        {courses.map((course) => (
          <div key={course.course_id}>
            <Link to={`/courses/${course.course_id}`}>
              <CourseCard
                courseID={course.course_id}
                courseTitle={course.course_title}
                courseDescription={course.course_desc}
                tutorName={course.trainer_id}
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Course;
