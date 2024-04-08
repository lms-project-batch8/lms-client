import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Button, CircularProgress } from "@mui/material"; // Import CircularProgress
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../Loader";

function Course() {
  const { user } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:20190/courses");

      setCourses(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const isTrainer = user.user_role.toLowerCase() === "trainer";

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader open={loading} />
      </div>
    );
  }

  return (
    <main className='flex flex-col'>
      <div className='p-5'>
        {isTrainer && (
          <Link to={`/course/new`}>
            <Button variant='contained'>Create a Course</Button>
          </Link>
        )}
      </div>

      <div className='flex p-4 gap-10 flex-wrap'>
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
