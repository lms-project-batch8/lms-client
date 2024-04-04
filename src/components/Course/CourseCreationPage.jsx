import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";

const CourseCreationPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [showModules, setShowModules] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [createdModules, setCreatedModules] = useState(new Set());
  const [courseId, setCourseId] = useState(0);
  const [moduleId, setModuleId] = useState(0);

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleAddModule = () => {
    setModules([...modules, { title: "", videos: [] }]);
  };

  const handleCourseCreate = async () => {
    try {
      const res = await axios.post("http://localhost:20190/courses", {
        trainer_id: user.user_id,
        course_title: courseTitle,
        course_desc: courseDescription,
      });
      setCourseId(res.data.courseId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModuleCreate = async (courseId, moduleName, moduleIndex) => {
    try {
      const res = await axios.post("http://localhost:20190/coursemodules", {
        course_id: courseId,
        cm_name: moduleName,
      });

      setCreatedModules((prev) => new Set(prev).add(moduleIndex));
      setModuleId(res.data.moduleId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveVideo = async (moduleIndex, videoIndex, moduleId) => {
    const video = modules[moduleIndex].videos[videoIndex];

    console.log({
      cm_id: moduleId,
      video_title: video.title,
      video_url: video.url,
    });
    
    try {
      await axios.post("http://localhost:20190/videos", {
        cm_id: moduleId,
        video_title: video.title,
        video_url: video.url,
      });
      console.log("Video saved successfully");
    } catch (error) {
      console.error("Failed to save video", error);
    }
  };

  const handleTitleChange = (e) => setCourseTitle(e.target.value);
  const handleDescriptionChange = (e) => setCourseDescription(e.target.value);
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
    setShowForm(false);
    // Reset states if needed
  };

  return (
    <>
      <Navbar />
      <div className='items-center h-screen overflow-y-auto'>
        {showForm && (
          <div className='pt-2 pl-9'>
            <div className='flex flex-col'>
              <div className='flex items-center gap-4'>
                <span className='block font-semibold text-gray-700 mb-2'>
                  Course Title
                </span>
                <input
                  id='courseTitle'
                  type='text'
                  value={courseTitle}
                  placeholder='Enter Course Title...'
                  onChange={handleTitleChange}
                  className='shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='flex items-center gap-4 mt-3'>
                <label
                  htmlFor='courseDescription'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Course Description
                </label>
                <input
                  id='courseDescription'
                  value={courseDescription}
                  onChange={handleDescriptionChange}
                  placeholder='Enter Course Description...'
                  className='shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                ></input>
                {!showModules && (
                  <span
                    className='m-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                    onClick={() => {
                      setShowModules(true);
                      handleCourseCreate();
                    }}
                  >
                    Proceed
                  </span>
                )}
              </div>
              {modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className='relative mt-4 border p-4 rounded bg-gray-300'
                >
                  <div className='flex gap-4 items-center justify-start'>
                    <label
                      htmlFor={`moduleTitle${moduleIndex}`}
                      className='block font-semibold'
                    >
                      Module Title
                    </label>
                    <div className='flex items-center'>
                      <input
                        id={`moduleTitle${moduleIndex}`}
                        type='text'
                        value={module.title}
                        placeholder='Enter Module Title...'
                        onChange={(e) => {
                          setModuleName(e.target.value);
                          handleModuleTitleChange(e, moduleIndex);
                        }}
                        className='border border-gray-300 px-4 py-[7px] rounded'
                      />
                      {!createdModules.has(moduleIndex) && (
                        <button
                          className='m-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
                          onClick={() =>
                            handleModuleCreate(
                              courseId,
                              moduleName,
                              moduleIndex,
                            )
                          }
                        >
                          Create Module
                        </button>
                      )}
                      {createdModules.has(moduleIndex) && (
                        <button
                          className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                          onClick={() => handleAddVideo(moduleIndex)}
                        >
                          Add Videos
                        </button>
                      )}
                    </div>
                  </div>
                  {module.videos.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      className='relative mt-2 p-4 flex flex-col border-[1px] rounded border-gray-300 bg-gray-50'
                    >
                      <label
                        htmlFor={`videoTitle${moduleIndex}${videoIndex}`}
                        className='block font-semibold'
                      >
                        Video Title
                      </label>
                      <input
                        id={`videoTitle${moduleIndex}${videoIndex}`}
                        type='text'
                        value={video.title}
                        onChange={(e) =>
                          handleVideoTitleChange(e, moduleIndex, videoIndex)
                        }
                        className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                      />
                      <label
                        htmlFor={`videoUrl${moduleIndex}${videoIndex}`}
                        className='block mt-2 font-semibold'
                      >
                        Video URL
                      </label>
                      <input
                        id={`videoUrl${moduleIndex}${videoIndex}`}
                        type='text'
                        value={video.url}
                        onChange={(e) =>
                          handleVideoUrlChange(e, moduleIndex, videoIndex)
                        }
                        className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                      />
                      <button
                        className='mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() =>
                          handleSaveVideo(moduleIndex, videoIndex, moduleId)
                        }
                      >
                        Save Video
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className='p-9'>
              {showModules && (
                <button
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                  onClick={handleAddModule}
                >
                  Add Module
                </button>
              )}
              {showSubmitButton && (
                <button
                  className='ml-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseCreationPage;
