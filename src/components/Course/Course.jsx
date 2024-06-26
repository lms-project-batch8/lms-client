import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Button } from "@mui/material"; // Import CircularProgress
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../Loader";
import Select from "react-select";
import { backend } from "../../url";

function Course() {
  const { user } = useSelector((state) => state.auth);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [courseId, setCourseId] = useState(0);

  const isTrainer = user.user_role.toLowerCase() === "trainer";
  const isSuperUser = user.user_role.toLowerCase() === "admin";

  const courseUrl =
    isTrainer || isSuperUser
      ? `${backend}/courses`
      : `${backend}/assign/courses?user_id=${user.user_id}`;

  useEffect(() => {
    const fetchData = async () => {
      if (!user.user_id) return;

      try {
        setLoading(true);
        const coursesResponse = await axios.get(courseUrl);
        setCourses(coursesResponse.data);

        if (user.user_role.toLowerCase() === "trainer") {
          const traineesResponse = await axios.get(
            `${backend}/users?user_role=trainee`,
          );
          const newOptionList = traineesResponse.data.map((user) => ({
            value: user.user_id.toString(),
            label: user.user_name,
          }));
          setOptionList(newOptionList);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [user.user_id]);

  const openTrainerDropdown = (courseID) => {
    setCourseId(courseID);
    setIsFormOpen(true);
  };

  const closeFormOverlay = () => {
    setIsFormOpen(false);
  };

  const handleAssign = async () => {
    await axios.post(`${backend}/assign/course`, {
      trainer_id: user.user_id,
      trainee_ids: selectedOptions,
      course_id: courseId,
    });
  };

  const submitForm = () => {
    handleAssign();
    setSelectedOptions();
    closeFormOverlay();
  };

  function handleSelect(data) {
    setSelectedOptions(data);
  }

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
                courseDescription={course.course_description}
                tutorID={course.trainer_id}
                openTrainerDropdown={openTrainerDropdown}
              />
            </Link>
          </div>
        ))}
      </div>
      {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            backgroundColor: "purple",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "500px",
          }}
        >
          <Select
            options={optionList}
            placeholder='Select Trainees'
            value={selectedOptions}
            onChange={handleSelect}
            isSearchable={true}
            isMulti
            className='mb-4'
          />
          <div className='flex justify-between'>
            <button
              onClick={closeFormOverlay}
              className='border py-1 px-2 rounded text-white font-bold'
            >
              Close
            </button>
            <button
              onClick={submitForm}
              className='border py-1 px-2 rounded text-white font-bold'
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Course;
