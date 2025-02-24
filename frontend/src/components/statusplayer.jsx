import React, { useState } from "react";
import Stories from "react-insta-stories";
import {FcNext,FcPrevious} from "react-icons/fc"
const Statusplayer = ({ stories }) => {

  const newStories=stories.content.map((url, index) => ({
    url,
    header: {
      heading: stories.name,
      subheading: stories.statustime[index],
      profileImage: stories.profile,
    },
    
  }));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Array.isArray(stories.content) || stories.content.length === 0) {
    return <p className="text-white">No stories available</p>;
  }
  console.log()

  const handleNext = () => {
    if (currentIndex < stories.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
console.log(currentIndex)
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
          if (index < stories.content.length - 1) {
            setCurrentIndex(index + 1);
          }
        }}
      />

      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75"
        >
         <FcPrevious/>
        </button>
      )}

      {/* Next Button */}
      {currentIndex < stories.content.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75"
        >
          <FcNext />
        </button>
      )}
    </div>
  );
};

export default Statusplayer;
