import React, { useState } from 'react';
import ReactPlayer from 'react-player';
 
function ModuleList({ modules }) {
  const [openVideoUrl, setOpenVideoUrl] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
 
  const toggleDropdown = (moduleId) => {
    if (openDropdownId === moduleId) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(moduleId);
    }
  };
 
  const playVideo = (videoUrl) => {
    console.log(videoUrl);
    setOpenVideoUrl(videoUrl);
  };
 
  const closeVideo = () => {
    setOpenVideoUrl(null);
  };
 
  return (
    <div className="container mx-auto py-8">
      <ul>
        {modules.map((module) => (
          <li key={module.id} className="m-4">
            <div className="cursor-pointer" onClick={() => toggleDropdown(module.id)}>
                {module.title}
            </div>
            {module.videos.length > 1 && openDropdownId === module.id && (
              <ul className="list-disc ml-6">
                {module.videos.map((video, index) => (
                  <li key={index}>
                    <button
                      className="text-blue-600 underline"
                      onClick={() => playVideo(video.url)}
                    >
                      {video.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {openVideoUrl && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-3/4 max-w-screen-lg">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <button className="bg-white px-2 py-1 rounded" onClick={closeVideo}>
                Close
              </button>
            </div>
            <ReactPlayer url={openVideoUrl} controls width="100%" height="100%" playing />
          </div>
        </div>
      )}
    </div>
  );
}
 
 
export default ModuleList;