import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Dialog,
  LinearProgress,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

function ModuleList({ course_id }) {
  const [openVideoUrl, setOpenVideoUrl] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [modules, setModules] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState({});

  const [courseProgress, setCourseProgress] = useState({});
  const [progressPercent, setProgressPercent] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const getModules = async () => {
    try {
      const res = await axios.get(
        `http://localhost:20190/coursemodules/${course_id}`,
      );
      setModules(res.data.modules);

      const watched = JSON.parse(courseProgress.course_progress_details) || {};
      setWatchedVideos(watched);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getModules();
  }, [course_id]);

  useEffect(() => {
    const getProgress = async () => {
      try {
        const res = await axios.get(
          `http://localhost:20190/courseProgress/get?cm_id=${course_id}&user_id=${user.user_id}`,
        );
        if (res.data.length > 0) {
          setCourseProgress(res.data[0]);
          console.log(courseProgress);
          setProgressPercent(res.data[0].course_complition_percentage);
          setWatchedVideos(res.data[0].course_progress_details);
        } else {
          console.log("No data available for course progress.");
          setCourseProgress({});
          setProgressPercent(0);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProgress();
  }, [course_id]);

  const toggleDropdown = (moduleId) => {
    setOpenDropdownId(openDropdownId === moduleId ? null : moduleId);
  };

  const playVideo = (videoUrl, videoId) => {
    setOpenVideoUrl(videoUrl);
    setCurrentVideoId(videoId);
  };

  const onVideoEnd = () => {
    const newWatchedVideos = { ...watchedVideos, [currentVideoId]: true };
    setWatchedVideos(newWatchedVideos);
    console.log(newWatchedVideos);

    setOpenVideoUrl(null);

    if (courseProgress && courseProgress.cp_id) {
      updateProgress();
    }
  };

  const closeVideo = () => {
    setOpenVideoUrl(null);
  };

  const totalVideos = modules.reduce(
    (acc, module) => acc + module.videos.length,
    0,
  );
  const watchedCount = Object.keys(watchedVideos ?? {}).length; // Safeguard against null
  const progress = totalVideos > 0 ? (watchedCount / totalVideos) * 100 : 0;

  const updateProgress = async () => {
    await axios.put(
      `http://localhost:20190/courseProgress/${courseProgress.cp_id}`,
      {
        course_progress_details: watchedVideos,
        course_complition_percentage: progress,
      },
    );
  };

  useEffect(() => {
    if (courseProgress && courseProgress.cp_id) {
      // Check if courseProgress is valid

      updateProgress();
    }
  }, [progress, courseProgress]);

  return (
    <div className='container mx-auto p-8'>
      <Typography variant='subtitle1'>Course Progress</Typography>
      <LinearProgress
        variant='determinate'
        value={parseInt(progressPercent)}
        className='mb-2'
        sx={{ height: "7px", borderRadius: "10px" }}
      />
      <Typography variant='body2' className='mb-4 pb-4'>
        {watchedCount} of {totalVideos} videos watched (
        {Math.round(progressPercent)}%)
      </Typography>

      <List component='nav' className='bg-white rounded shadow'>
        {modules.map((module) => (
          <div key={module.cm_id}>
            <ListItem button onClick={() => toggleDropdown(module.cm_id)}>
              <ListItemText primary={module.cm_name} />
              {openDropdownId === module.cm_id ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={openDropdownId === module.cm_id}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                {module.videos.map((video, index) => (
                  <ListItem key={video.video_id} className='pl-10'>
                    <ListItemText
                      primary={video.video_title}
                      onClick={() => playVideo(video.video_url, video.video_id)}
                      className='cursor-pointer text-blue-600 underline'
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
      <Dialog
        open={Boolean(openVideoUrl)}
        onClose={closeVideo}
        maxWidth='lg'
        fullWidth
      >
        <IconButton
          edge='start'
          color='inherit'
          onClick={closeVideo}
          aria-label='close'
          className='absolute right-2 top-2 z-50'
        >
          <Close />
        </IconButton>
        <ReactPlayer
          url={openVideoUrl}
          controls
          width='1200px'
          height='1024px'
          playing
          onEnded={onVideoEnd}
        />
      </Dialog>
    </div>
  );
}

export default ModuleList;
