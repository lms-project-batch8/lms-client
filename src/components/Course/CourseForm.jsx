import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";
import { backend } from "../../url";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CourseForm() {
  const navigate = useNavigate();

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

  const deleteModule = (moduleIndex) => {
    const newModules = [...course.modules];
    newModules.splice(moduleIndex, 1);
    setCourse({ ...course, modules: newModules });
  };

  const deleteVideo = (moduleIndex, videoIndex) => {
    const newModules = [...course.modules];
    newModules[moduleIndex].videos.splice(videoIndex, 1);
    setCourse({ ...course, modules: newModules });
  };

  const submitCourse = async () => {
    try {
      course.trainer_id = user.user_id;
      await axios.post(`${backend}/courses`, course);
      toast.success("Course created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Course creation failed!");
    } finally {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleSubmit = () => {
    submitCourse();
  };

  return (
    <>
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
        <TextField
          fullWidth
          label='Course Description'
          name='description'
          multiline
          minRows={4}
          value={course.description}
          onChange={handleCourseChange}
          variant='outlined'
          margin='normal'
        />
        {course.modules.map((module, moduleIndex) => (
          <Card key={moduleIndex} variant='outlined' sx={{ my: 2 }}>
            <CardContent>
              <Typography variant='h6'>Module {moduleIndex + 1}</Typography>
              <div className='flex flex-row'>
                <TextField
                  fullWidth
                  label='Module Title'
                  name='title'
                  value={module.title}
                  onChange={(event) => handleModuleChange(moduleIndex, event)}
                  variant='outlined'
                  margin='normal'
                />
                <IconButton
                  onClick={() => deleteModule(moduleIndex)}
                  sx={{ color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              {module.videos.map((video, videoIndex) => (
                <Box
                  key={videoIndex}
                  sx={{
                    ml: 3,
                    mt: 1,
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
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
                  <IconButton
                    onClick={() => deleteVideo(moduleIndex, videoIndex)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddCircleOutlineIcon />}
                variant='contained'
                color='primary'
                onClick={() => addVideo(moduleIndex)}
                sx={{ mt: 1 }}
              >
                Add Video
              </Button>
            </CardContent>
          </Card>
        ))}
        <Button
          startIcon={<AddCircleOutlineIcon />}
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
      <ToastContainer />
    </>
  );
}

export default CourseForm;
