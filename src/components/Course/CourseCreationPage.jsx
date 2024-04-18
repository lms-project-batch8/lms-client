import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../Navbar/Navbar";

const CourseCreationPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [modules, setModules] = useState([]);
  const [showModules, setShowModules] = useState(false);
  const [createdModules, setCreatedModules] = useState(new Set());
  const [courseId, setCourseId] = useState(0);

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    setShowForm(true);
  }, []);

  const handleAddModule = () => {
    setModules([...modules, { title: "", videos: [] }]);
  };

  const handleCourseCreate = async () => {
    try {
      const res = await axios.post("https://lms-server-15hc.onrender.com/courses", {
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
      const res = await axios.post("https://lms-server-15hc.onrender.com/coursemodules", {
        course_id: courseId,
        cm_name: moduleName,
      });

      setCreatedModules((prev) => new Set(prev).add(moduleIndex));
      // Update the module with the returned moduleId
      const updatedModules = [...modules];
      updatedModules[moduleIndex] = {
        ...updatedModules[moduleIndex],
        id: res.data.moduleId,
      };
      setModules(updatedModules);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveVideo = async (moduleIndex, videoIndex) => {
    const video = modules[moduleIndex].videos[videoIndex];
    const moduleId = modules[moduleIndex].id; // Use the moduleId assigned when the module was created

    try {
      await axios.post("https://lms-server-15hc.onrender.com/videos", {
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
  };

  return (
    <>
      <Navbar />
      <Container maxWidth='md'>
        <Box my={4}>
          <Typography variant='h4' gutterBottom>
            Create a New Course
          </Typography>
          {showForm && (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Course Title'
                    variant='outlined'
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Course Description'
                    variant='outlined'
                    multiline
                    rows={4}
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                      setShowModules(true);
                      handleCourseCreate();
                    }}
                  >
                    Proceed to Add Modules
                  </Button>
                </Grid>
              </Grid>

              {modules.map((module, moduleIndex) => (
                <Card key={moduleIndex} sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Module {moduleIndex + 1}
                    </Typography>
                    <TextField
                      fullWidth
                      label='Module Title'
                      variant='outlined'
                      sx={{ mb: 2 }}
                      value={module.title}
                      onChange={(e) => {
                        const updatedModules = [...modules];
                        updatedModules[moduleIndex].title = e.target.value;
                        setModules(updatedModules);
                      }}
                    />
                    {!createdModules.has(moduleIndex) && (
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<SaveIcon />}
                        sx={{ mb: 2 }}
                        onClick={() =>
                          handleModuleCreate(
                            courseId,
                            module.title,
                            moduleIndex,
                          )
                        }
                      >
                        Save Module
                      </Button>
                    )}
                    {createdModules.has(moduleIndex) &&
                      module.videos.map((video, videoIndex) => (
                        <Box key={videoIndex} sx={{ mt: 2 }}>
                          <TextField
                            fullWidth
                            label='Video Title'
                            variant='outlined'
                            sx={{ mb: 1 }}
                            value={video.title}
                            onChange={(e) => {
                              const updatedModules = [...modules];
                              updatedModules[moduleIndex].videos[
                                videoIndex
                              ].title = e.target.value;
                              setModules(updatedModules);
                            }}
                          />
                          <TextField
                            fullWidth
                            label='Video URL'
                            variant='outlined'
                            sx={{ mb: 2 }}
                            value={video.url}
                            onChange={(e) => {
                              const updatedModules = [...modules];
                              updatedModules[moduleIndex].videos[
                                videoIndex
                              ].url = e.target.value;
                              setModules(updatedModules);
                            }}
                          />
                          <Button
                            variant='contained'
                            color='secondary'
                            startIcon={<SaveIcon />}
                            onClick={() =>
                              handleSaveVideo(moduleIndex, videoIndex)
                            }
                          >
                            Save Video
                          </Button>
                        </Box>
                      ))}
                    {createdModules.has(moduleIndex) && (
                      <Button
                        variant='contained'
                        color='info'
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => {
                          const updatedModules = [...modules];
                          updatedModules[moduleIndex].videos.push({
                            title: "",
                            url: "",
                          });
                          setModules(updatedModules);
                        }}
                      >
                        Add Video
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}

              {showModules && (
                <Box display='flex' justifyContent='flex-end' mt={2}>
                  <Button
                    variant='contained'
                    color='info'
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddModule}
                    sx={{ mr: 1 }}
                  >
                    Add Module
                  </Button>
                  <Button
                    variant='contained'
                    color='success'
                    endIcon={<SendIcon />}
                    onClick={() => console.log("Submit Course")}
                  >
                    Submit Course
                  </Button>
                </Box>
              )}
            </form>
          )}
        </Box>
      </Container>
    </>
  );
};

export default CourseCreationPage;
