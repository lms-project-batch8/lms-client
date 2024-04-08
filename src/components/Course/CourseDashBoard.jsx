import React, { useEffect, useState } from "react";
import ModuleList from "./ModuleList";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function CourseDashBoard() {
  const { id } = useParams();

  const [course, setCourse] = useState({});

  const getCourse = async () => {
    try {
      const res = await axios.get("http://localhost:20190/courses/" + id);

      console.log(res.data);
      setCourse(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <Navbar />
      <div className='flex h-screen '>
        <section className='w-1/2 p-8 bg-gray-200'>
          <h1 className='text-2xl font-bold mb-4'>{course.course_title}</h1>
          <p className='text-lg mb-8'>{course.course_desc}</p>
        </section>
        <section className='w-full h-full p-8 bg-gray-100 overflow-y-auto'>
          <div className=''>
            <h1 className='text-2xl font-bold mb-4'>Contents</h1>
            <div>
              <ModuleList course_id={course.course_id} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CourseDashBoard;
