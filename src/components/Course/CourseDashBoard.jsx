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
  const [error, setError] = useState(false);

  const getCourse = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${backend}/courses/${id}`);

      console.log(res.data);

      if (res.data && res.data.length > 0) {
        setCourse(res.data[0]);
        setError(false);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setTimeout(() => setLoading(false), [1000]);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  if (error) {
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
