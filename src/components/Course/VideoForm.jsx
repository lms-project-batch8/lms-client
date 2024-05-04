import React from 'react';
import { TextField } from '@mui/material';

function VideoForm({ video }) {
  return (
    <div className="mb-2">
      <TextField
        fullWidth
        label="Video Title"
        variant="outlined"
        value={video.title}
        onChange={(e) => (video.title = e.target.value)}
      />
    </div>
  );
}

export default VideoForm;
