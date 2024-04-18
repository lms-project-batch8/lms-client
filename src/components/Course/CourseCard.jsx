import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CourseCard({
  courseID,
  courseTitle,
  courseDescription,
  tutorName,
  openTrainerDropdown,
}) {
  if (courseDescription.length > 30)
    courseDescription = `${courseDescription.substring(0, 27)}...`;

  const [tutor, setTutor] = useState({ name: "" });

  const { user } = useSelector((state) => state.auth);

  const getTutorName = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:20190/users/${tutorName}`,
      );
      if (data && data.length > 0) {
        setTutor({ name: data[0].user_name });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTutorName();
  }, [tutorName]);

  return (
    <div className='max-w-xs rounded-lg overflow-hidden shadow-lg bg-white flex flex-col cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 mb-16'>
      <img
        className='w-full h-40 object-cover'
        src='https://media.istockphoto.com/id/1349094915/photo/businessman-using-computer-laptop-for-learning-online-internet-lessons-e-learning-education.jpg?s=1024x1024&w=is&k=20&c=B8tMldGwEgDSqLBc6kF7kYNEHZA69cN3qmS54pWbb8w='
        alt={`${courseTitle} Course Image`}
      />
      <div className='flex flex-col p-6 bg-gray-50 space-y-4'>
        {courseTitle && (
          <h3 className='font-semibold text-xl'>{courseTitle}</h3>
        )}
        {courseDescription && (
          <p className='text-gray-700 text-base'>{courseDescription}</p>
        )}
        {tutor.name && (
          <span className='text-gray-600 text-sm'>Posted by {tutor.name}</span>
        )}
      </div>
      {user.user_role === "trainer" && (
        <button
          className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 mt-4 self-start mx-6 mb-4'
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            openTrainerDropdown(courseID);
          }}
        >
          Assign
        </button>
      )}
    </div>
  );
}

export default CourseCard;
