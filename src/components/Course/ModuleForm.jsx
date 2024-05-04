import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import VideoForm from "./VideoForm"

function ModuleForm({ module }) {
  const [title, setTitle] = useState(module.title);
  const [videos, setVideos] = useState(module.videos);

  const addVideo = () => {
    setVideos([...videos, { id: Date.now(), title: "" }]);
  };

  return (
    <div className='mb-4 p-4 border'>
      <TextField
        fullWidth
        label='Module Title'
        variant='outlined'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {videos.map((video) => (
        <VideoForm key={video.id} video={video} />
      ))}
      <Button variant='contained' onClick={addVideo}>
        Add Video
      </Button>
    </div>
  );
}

export default ModuleForm;
