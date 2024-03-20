import React from 'react';
import { useParams } from 'react-router-dom';
function VideoCard({courseID,courseTitle, courseDescription, tutorName,course}) {
    if(courseDescription.length > 30) courseDescription = courseDescription.substring(0,21);
    return (
            <div className="max-w-xs rounded overflow-hidden hover:shadow-lg
                bg-white flex flex-col hover:bg-sky-xl cursor-pointer transition-duration-300">
                <img className="w-auto h-40" src='https://media.istockphoto.com/id/1349094915/photo/businessman-using-computer-laptop-for-learning-online-internet-lessons-e-learning-education.jpg?s=1024x1024&w=is&k=20&c=B8tMldGwEgDSqLBc6kF7kYNEHZA69cN3qmS54pWbb8w=' alt='courseImage'></img>
                <div className="flex flex-col px-6 py-2 bg-[#faebd7]">
                    {courseTitle && <div className="font-bold text-[1.4rem] leading-[1.2] mb-2">{courseTitle}</div>}
                    {courseDescription && <p className="text-gray-700 text-[1.2rem] leading-[1.2] mb-2">
                        {courseDescription+"..."}</p>}
                    {tutorName && <div className='text-gray-700 text-sm'>{`Posted by ${tutorName}`}</div>}
                </div>
            </div>
    )
}
export default VideoCard;