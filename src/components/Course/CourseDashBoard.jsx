import React from 'react'
import ModuleList from './ModuleList';
 
function CourseDashBoard() {
    const modules = [
        {
          id: 1,
          title: 'Module 1',
          videos: [
            { id: 1, title: 'Video 1.1', url: 'https://youtu.be/-yIsQPp31L0?si=UF2yrbbqFSHd-HOs' },
            { id: 2, title: 'Video 1.2', url: 'https://youtu.be/8uEV4fwGynU?si=Q42IYgIPJiprhspF' },
          ],
        },
        {
          id: 2,
          title: 'Module 2',
          videos: [
            { id: 3, title: 'Video 2.1', url: 'https://example.com/video3' },
            { id: 4, title: 'Video 2.2', url: 'https://example.com/video4' },
          ],
        },
      ];
     
     
    return (
        <>
            <div className='flex h-screen'>
                <section className='w-1/2 p-8 bg-gray-200'>
                    <h1 className="text-2xl font-bold mb-4">Course Title</h1>
                    <p className="text-lg mb-8">Course Description Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </section>
                <section className='w-full h-full p-8 bg-gray-100 overflow-y-auto'>
                    <div className=''>
                        <h1 className="text-2xl font-bold mb-4">Course Content</h1>
                        <div>
                            <ModuleList modules = {modules}/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
 
export default CourseDashBoard