import React, { useEffect, useState } from "react";
import ModuleList from "./ModuleList";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function CourseDashBoard() {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [error, setError] = useState(false);

  const getCourse = async () => {
    try {
      const res = await axios.get(`https://lms-server-15hc.onrender.com/courses/${id}`);
      console.log(res.data);
      if (res.data && res.data.length > 0) {
        setCourse(res.data[0]);
        setError(false); // Reset error state in case of successful fetch
      } else {
        throw new Error("No data found"); // Throw an error if no data is returned
      }
    } catch (error) {
      console.log(error);
      setError(true); // Set error state to true to trigger error message display
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  if (error) {
    // Render an error message or an error component
    return (
      <div>
        <Navbar />
        <div className='text-center mt-20'>
          <h2 className='text-xl font-bold'>
            Failed to load course data. Please try again later.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex h-screen'>
        <section className='w-1/2 p-8 bg-gray-200'>
          <h1 className='text-2xl font-bold mb-4'>
            {course.course_title || "Loading..."}
          </h1>
          <p className='text-lg mb-8'>
            {course.course_desc ||
              "Course description will appear here once loaded."}
          </p>
        </section>
        <section className='w-full h-full p-8 bg-gray-100 overflow-y-auto'>
          <div>
            <h1 className='text-2xl font-bold mb-4'>Contents</h1>
            <ModuleList course_id={course.course_id} />
          </div>
        </section>
      </div>
    </>
  );
}

export default CourseDashBoard;
