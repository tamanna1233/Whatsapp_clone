import React, { useState, useEffect } from 'react';
import Stories from 'react-insta-stories';
import { IoTrashOutline } from 'react-icons/io5';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { useCallback } from 'react';
import { useStatus } from '../store/statusStore.js';

const Statusplayer = ({ stories, closeplayer, setviwedStatus }) => {

      const [currentIndex, setCurrentIndex] = useState(0);
      const [viewedStatuses, setViewedStatuses] = useState([]);
      const { deleteStatus } = useStatus();

      if(!stories){
            return <p className="text-white">No stories available</p>;
      }
      console.log("status mounted")
      useEffect(() => {
            // Get viewed statuses from localStorage
            const storedViewedStatuses = JSON.parse(localStorage.getItem('viewedStatuses')) || [];
            setViewedStatuses(storedViewedStatuses);
      }, []);

      const newStories = stories.content.map((url, index) => ({
            url,
            type: url.endsWith('.mp4') || url.endsWith('.webm') ? 'video' : 'image',
            header: {
                  heading: stories.name,
                  subheading: stories.statustime[index],
                  profileImage: stories.profile,
            },
      }));

      if (!Array.isArray(stories) && stories.content.length === 0) {
            return <p className="text-white">No stories available</p>;
      }

      const markAsViewed = useCallback(
            (index) => {
                  const statusId = stories.statusId[index];

                  if (!viewedStatuses.includes(statusId)) {
                        const updatedStatuses = [...viewedStatuses, statusId];
                        setViewedStatuses(updatedStatuses);
                        localStorage.setItem('viwedStatus', JSON.stringify(updatedStatuses));
                  }
            },
            [stories, viewedStatuses],
      );

      const handleDelete = async () => {
            console.log('click');
            if (!stories || !stories.statusId || stories.statusId.length === 0) {
                  console.log('No status Id found');
                  return;
            }
            const statusId = stories.statusId[currentIndex];
            console.log('deleting stataus :', statusId);
            await deleteStatus(statusId);




           
      };

      return (
                  <div className="w-full h-screen flex items-center justify-center relative bg-transparent">
                        {/* Story Player */}
                        <Stories
                              stories={newStories}
                              currentIndex={currentIndex}
                              defaultInterval={4000}
                              width={400}
                              height={700}
                              onStoryEnd={(index) => {
                                    markAsViewed(index);
                                    if (index < stories.content.length - 1) {
                                          setCurrentIndex(index + 1);
                                    }
                              }}
                              onNext={() => {
                                    markAsViewed(currentIndex);
                                    setCurrentIndex((prev) => prev + 1);
                              }}
                              onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                              keyboardNavigation={true}
                              onAllStoriesEnd={closeplayer}
                        />

                        {/* Previous Button */}
                        {currentIndex > 0 && (
                              <button
                                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75"
                              >
                                    <FcPrevious />
                              </button>
                        )}

                        {/* Next Button */}
                        {currentIndex < stories.content.length - 1 && (
                              <button
                                    onClick={() => {
                                          markAsViewed(currentIndex);
                                          setCurrentIndex((prev) => prev + 1);
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75"
                              >
                                    <FcNext />
                              </button>
                        )}
                        {/*   delete */}
                        <button
                              className="  text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg
                              absolute bottom-2 "
                              onClick={() => {
                              handleDelete()
                              }}
                        >
                              <IoTrashOutline size={28} className="text-white text-lg" />
                        </button>
                  </div>
      );
};

export default Statusplayer;
