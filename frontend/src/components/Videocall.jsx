import { usecallStore } from '@/store/useCallStore';
import { Expand, Minimize } from 'lucide-react';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { FaMicrophone, FaMicrophoneLinesSlash, FaViadeo, FaVideo, FaVideoSlash } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

const Videocall = () => {
  const { isInCall, endCall, isMinimized, toggleMinimized } = usecallStore();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({ x: 1300, y: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const [isMute,setisMute]=useState(true)
  const [isVideo,setIsVideo]=useState(true)

  // Start media stream
  const startStream = useCallback(async () => {
    if (streamRef.current) return;
    try {
      const mainStream = await navigator.mediaDevices.getUserMedia({
        video: isVideo,
        audio: isMute
      });
      streamRef.current = mainStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mainStream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setError("Failed to access camera/microphone.");
    }
  }, [isMute,isVideo]);

  useEffect(() => {
    if (isInCall) {
      startStream();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [isInCall, startStream]);

  const endcall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    endCall();
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    if (!isMinimized) return; // Prevent drag when fullscreen
    setIsDragging(true);
    dragRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
const handelMute=()=>{
  setisMute(!isMute)
}
const handelVideo=()=>{
  setIsVideo(!isVideo)
  
}
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isInCall) return null;

  return (
    <div
      className={`fixed bg-black text-white shadow-lg transition-all rounded-lg overflow-hidden z-50
      ${isMinimized ? "w-80 h-56" : "w-screen h-screen"} `}
      style={{
        transform: isMinimized ? `translate(${position.x}px, ${position.y}px)` : "none",
        cursor: isMinimized ? (isDragging ? "grabbing" : "grab") : "default"
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center p-2 bg-gray-800"
        onMouseDown={handleMouseDown}
        style={{ cursor: isMinimized ? "grab" : "default" }}
      >
        <span>Video Call</span>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimized();
            }}
            className="text-sm bg-gray-600 px-2 py-1 rounded"
          >
           {isMinimized?<Expand/>:<Minimize/>}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              endcall();
            }}
            className="text-sm bg-red-500 px-2 py-1 rounded"
          >
            <MdClose/>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-full">
  {error ? (
    <p className="text-red-500 text-center px-4">{error}</p>
  ) : (
    <video
      ref={videoRef}
      autoPlay
      muted
      className=" w-screen h-full  aspect-video object-contain "
    />
  )}
</div>

      {/* footer */}
<div className="fixed  bottom-10 w-full ">
  <div className='flex items-center justify-center p-2 w-full  gap-8' >

  <button onClick={handelMute} className="text-white">
   {isMute?<FaMicrophone size={25}/>:<FaMicrophoneLinesSlash size={35} className='text-red-500'/>}
  </button>
  <button onClick={handelVideo} className="text-white">
   {isVideo?<FaVideo size={25}/>:<FaVideoSlash size={25} className='text-red-500'/>}
  </button>
  </div>
</div>

    </div>
  );
};

export default Videocall;
