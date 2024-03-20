import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const CourseCreationPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [modules, setModules] = useState([]);

  const handleCreateCourse = () => {
    setShowForm(true);
  };

  useEffect(()=>{
  handleCreateCourse()
  },
  [])
  const handleAddModule = () => {
    setModules([...modules, { title: "", videos: [] }]);
  };

  const handleTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setCourseDescription(e.target.value);
  };

  const handleModuleTitleChange = (e, index) => {
    const updatedModules = [...modules];
    updatedModules[index].title = e.target.value;
    setModules(updatedModules);
  };

  const handleAddVideo = (index) => {
    const updatedModules = [...modules];
    updatedModules[index].videos.push({ title: "", url: "" });
    setModules(updatedModules);
  };

  const handleVideoTitleChange = (e, moduleIndex, videoIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos[videoIndex].title = e.target.value;
    setModules(updatedModules);
  };

  const handleVideoUrlChange = (e, moduleIndex, videoIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].videos[videoIndex].url = e.target.value;
    setModules(updatedModules);
  };

  const handleSubmit = () => {
    const newCourse = {
      title: courseTitle,
      description: courseDescription,
      modules: [...modules],
    };

    setCourses([...courses, newCourse]);

    setCourseTitle("");
    setCourseDescription("");
    setModules([]);
    setShowForm(false);
    console.log(JSON.stringify({ courseTitle, courseDescription, modules }));
  };

  return (
    <>
    <Navbar/>
    <div className="p-4 items-center h-screen overflow-y-auto">
      {showForm && (
        <div className="mt-4 p-9">
          <div className="flex flex-col p-9">
            <label
              htmlFor="courseTitle"
              className="block font-semibold text-gray-700 mb-2"
            >
              Course Title
            </label>
            <input
              id="courseTitle"
              type="text"
              value={courseTitle}
              placeholder="Enter Course Title..."
              onChange={handleTitleChange}
              className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="courseDescription"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Course Description
            </label>
            <textarea
              id="courseDescription"
              value={courseDescription}
              onChange={handleDescriptionChange}
              placeholder="Enter Course Description..."
              rows={7}
              className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            {modules.map((module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="relative mt-4 border p-4 rounded"
              >
                <label
                  htmlFor={`moduleTitle${moduleIndex}`}
                  className="block font-semibold"
                >
                  Module Title
                </label>
                <input
                  id={`moduleTitle${moduleIndex}`}
                  type="text"
                  value={module.title}
                  placeholder="Enter Module Title..."
                  onChange={(e) => handleModuleTitleChange(e, moduleIndex)}
                  className="border border-gray-300 px-3 py-2 rounded"
                />

                <button
                  className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAddVideo(moduleIndex)}
                >
                  Add Videos
                </button>

                {module.videos.map((video, videoIndex) => (
                  // className="mt-4"
                  <div
                    key={videoIndex}
                    className="relative m-4 flex flex-col border-[1px] border-black bg-gray-50"
                  >
                    <label
                      htmlFor={`videoTitle${moduleIndex}${videoIndex}`}
                      className="block font-semibold"
                    >
                      Video Title
                    </label>
                    <input
                      id={`videoTitle${moduleIndex}${videoIndex}`}
                      type="text"
                      value={video.title}
                      onChange={(e) =>
                        handleVideoTitleChange(e, moduleIndex, videoIndex)
                      }
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />

                    <label
                      htmlFor={`videoUrl${moduleIndex}${videoIndex}`}
                      className="block mt-2 font-semibold"
                    >
                      Video URL
                    </label>
                    <input
                      id={`videoUrl${moduleIndex}${videoIndex}`}
                      type="text"
                      value={video.url}
                      onChange={(e) =>
                        handleVideoUrlChange(e, moduleIndex, videoIndex)
                      }
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="p-9">
            <button
              className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddModule}
            >
              Add Module
            </button>
            <button
              className="ml-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CourseCreationPage;
