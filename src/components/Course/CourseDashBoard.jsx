import React, { useEffect, useState } from "react";
import ModuleList from "./ModuleList";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Loader from "../Loader";
import { backend } from "../../url";

function CourseDashBoard() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({});

  const getCourse = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${backend}/courses/${id}`);

      if (res.data && res.data.length > 0) {
        setCourse(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), [1000]);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader open={loading} />
      ) : (
        <>
          <Navbar />
          <div className='flex h-screen'>
            <section className='w-1/2 p-8 bg-gray-200'>
              <h1 className='text-2xl font-bold mb-4'>
                {course.course_title || "Loading..."}
              </h1>
              <p className='text-lg mb-8'>
                {course.course_description ||
                  "Course description will appear here once loaded."}
              </p>
            </section>
            <section className='w-full h-full p-8 bg-gray-100 overflow-y-auto'>
              <div>
                <h1 className='text-2xl font-bold mb-4'>Contents</h1>
                <ModuleList course={course} />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default CourseDashBoard;
