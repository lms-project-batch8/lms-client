import React ,{useEffect} from "react";
import { Route, Routes, BrowserRouter, Link} from "react-router-dom";
import VideoCard from "./VideoCard";
import { Button } from "@mui/material";

function Course() {
  // const history = useHistory();

  // const handleGoBack = () => {
  //   history.goBack(); // This will take the user back to the previous page in the history stack
  // };
  const courses = [
    {
      id: 1,
      title: "Course 1",
      description: "Description of course 1",
      duration: "6 weeks",
      tutor: "Sourav Mukherjee",
    },
    {
      id: 2,
      title: "Course 2",
      description: "Description of course 2",
      duration: "8 weeks",
      tutor: "Sourav Mukherjee",
    },
    {
      id: 3,
      title: "Course 3",
      description: "Description of course 3",
      duration: "10 weeks",
      tutor: "Sourav Mukherjee",
    },
  ];
  return (
    <main className="flex flex-col">
      <Link to={`/course/new`}>
        <div className="p-5">
          <Button variant="contained">Create a Course</Button>
        </div>
      </Link>
      <div className="flex p-4 gap-5">
        {courses.map((course) => (
          <div key={course.id}>
            <Link to={`/courses/${course.id}`}>
              <VideoCard
                courseID={course.id}
                courseTitle={course.title}
                courseDescription={course.description}
                tutorName={course.tutor}
              />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Course;
