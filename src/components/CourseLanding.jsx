import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CourseLanding = () => {
  const location = useLocation();
  const { courseId } = location.state || {};

  const getCourse = async () => {
    try {
      const res = await axios.get("https://lms-server-15hc.onrender.com/courses/all");

      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCourse();
  }, []);

  const navigate = useNavigate();

  const [courseStart, setcourseStart] = useState(false);

  return (
    <main>
      <div>CourseLanding {courseId}</div>
      <div>
        <Link to={`/course/${courseId}/start`}>Start Course</Link>
      </div>
    </main>
  );
};

export default CourseLanding;
