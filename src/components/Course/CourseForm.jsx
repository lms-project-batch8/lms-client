import React, { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { backend } from "../../url";

function CourseForm() {
  const { user } = useSelector((state) => state.auth);

  const [course, setCourse] = useState({
    name: "",
    description: "",
    modules: [{ title: "", videos: [{ title: "", url: "" }] }],
  });

  const handleCourseChange = (event) => {
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  const addModule = () => {
    const newModules = [
      ...course.modules,
      { title: "", videos: [{ title: "", url: "" }] },
    ];
    setCourse({ ...course, modules: newModules });
  };

  const handleModuleChange = (index, event) => {
    const newModules = [...course.modules];
    newModules[index] = {
      ...newModules[index],
      [event.target.name]: event.target.value,
    };
    setCourse({ ...course, modules: newModules });
  };

  const addVideo = (moduleIndex) => {
    const newModules = [...course.modules];
    const newVideos = [
      ...newModules[moduleIndex].videos,
      { title: "", url: "" },
    ];
    newModules[moduleIndex].videos = newVideos;
    setCourse({ ...course, modules: newModules });
  };

  const handleVideoChange = (moduleIndex, videoIndex, event) => {
    const newModules = [...course.modules];
    const newVideos = [...newModules[moduleIndex].videos];
    newVideos[videoIndex] = {
      ...newVideos[videoIndex],
      [event.target.name]: event.target.value,
    };
    newModules[moduleIndex].videos = newVideos;
    setCourse({ ...course, modules: newModules });
  };

  const submitCourse = async () => {
    try {
      course.trainer_id = user.user_id;
      console.log(course);
      await axios.post(`${backend}/courses`, course);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    submitCourse();
  };

  return (
    <Box sx={{ maxWidth: 800, m: "auto", p: 3 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Create Course
      </Typography>
      <TextField
        fullWidth
        label='Course Name'
        name='name'
        value={course.name}
        onChange={handleCourseChange}
        variant='outlined'
        margin='normal'
      />
      <TextareaAutosize
        minRows={4}
        style={{ width: "100%", padding: 8 }}
        name='description'
        value={course.description}
        onChange={handleCourseChange}
        placeholder='Course Description'
      />
      {course.modules.map((module, moduleIndex) => (
        <Box key={moduleIndex} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label='Module Title'
            name='title'
            value={module.title}
            onChange={(event) => handleModuleChange(moduleIndex, event)}
            variant='outlined'
            margin='normal'
          />
          {module.videos.map((video, videoIndex) => (
            <Box key={videoIndex} sx={{ ml: 3, mt: 1 }}>
              <TextField
                fullWidth
                label='Video Title'
                name='title'
                value={video.title}
                onChange={(event) =>
                  handleVideoChange(moduleIndex, videoIndex, event)
                }
                variant='outlined'
                margin='normal'
              />
              <TextField
                fullWidth
                label='Video URL'
                name='url'
                value={video.url}
                onChange={(event) =>
                  handleVideoChange(moduleIndex, videoIndex, event)
                }
                variant='outlined'
                margin='normal'
              />
            </Box>
          ))}
          <Button
            variant='contained'
            color='primary'
            onClick={() => addVideo(moduleIndex)}
            sx={{ mt: 1 }}
          >
            Add Video
          </Button>
        </Box>
      ))}
      <Button
        variant='contained'
        color='primary'
        onClick={addModule}
        sx={{ mt: 2 }}
      >
        Add Module
      </Button>
      <Button
        variant='outlined'
        color='secondary'
        onClick={handleSubmit}
        sx={{ ml: 2, mt: 2 }}
      >
        Submit Course
      </Button>
    </Box>
  );
}

export default CourseForm;
