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
import {
  ExpandLess,
  ExpandMore,
  Close,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import VerifiedIcon from "@mui/icons-material/Verified";
import { backend } from "../../url";

function ModuleList({ course }) {
  useEffect(() => {
    getProgress();
    getSeenVideos();
  });

  const [openVideoUrl, setOpenVideoUrl] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [progressPercent, setProgressPercent] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const [watchedCount, setWatchedCount] = useState(0);

  const [currentWatchingVideoId, setCurrentWatchingVideoId] = useState(0);

  const [seenVideos, setSeenVideos] = useState([]);

  const toggleDropdown = (moduleId) => {
    setOpenDropdownId(openDropdownId === moduleId ? null : moduleId);
  };

  const playVideo = (videoUrl, videoId) => {
    setOpenVideoUrl(videoUrl);
    setCurrentWatchingVideoId(videoId);
  };

  const getProgress = async () => {
    try {
      const res = await axios.get(
        `${backend}/courseprogress?user_id=${user.user_id}&course_id=${course.course_id}`,
      );

      setWatchedCount(res.data[0].number_of_videos_done);
      setProgressPercent((watchedCount / course.video_count) * 100);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeenVideos = async () => {
    const res = await axios.get(
      `${backend}/video/completed?user_id=${user.user_id}`,
    );
    setSeenVideos(res.data);
  };

  const onVideoEnd = async () => {
    setOpenVideoUrl(null);

    try {
      await axios.put(
        `${backend}/courseprogress?user_id=${user.user_id}&course_id=${course.course_id}&video_id=${currentWatchingVideoId}`,
      );
    } catch (err) {
      console.log(err);
    } finally {
      getProgress();
      getSeenVideos();
    }
  };

  const closeVideo = () => {
    setOpenVideoUrl(null);
  };

  const isVideoSeen = (videoId) =>
    seenVideos.some((video) => video.video_id === videoId);

  return (
    <div className='container mx-auto p-8'>
      <Typography variant='subtitle1'>Course Progress</Typography>
      <LinearProgress
        variant='determinate'
        value={progressPercent}
        className='mb-2'
        sx={{ height: "7px", borderRadius: "10px" }}
      />
      <Typography variant='body2' className='mb-4 pb-4'>
        {watchedCount} of {course.video_count === null ? 0 : course.video_count}{" "}
        videos watched ({Math.round(progressPercent)}%)
      </Typography>

      <List component='nav' className='bg-gray-200 rounded shadow'>
        {course.modules?.map((module, index) => (
          <div key={module.module_id}>
            <ListItem
              button
              onClick={() => toggleDropdown(module.module_id)}
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
              }}
            >
              <ListItemText primary={module.module_name} />
              {openDropdownId === module.module_id ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={openDropdownId === module.module_id}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                {module.videos.map((video, index) => (
                  <ListItem
                    key={video.video_id}
                    style={{
                      paddingLeft: "10px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "between",
                      backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                    }}
                  >
                    <ListItemText
                      primary={video.video_title}
                      onClick={() => playVideo(video.video_url, video.video_id)}
                      className='cursor-pointer text-blue-600 font-bold text-2xl'
                    />
                    {isVideoSeen(video.video_id) && (
                      <VerifiedIcon color='success' />
                    )}
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
