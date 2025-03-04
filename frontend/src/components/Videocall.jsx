import { chatEventEnum } from '@/constants';
import peer from '@/services/peer';
import { authstore } from '@/store/authstore';
import { usecallStore } from '@/store/useCallStore';
import { CircleGauge, Expand, Minimize } from 'lucide-react';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
      FaMicrophone,
      FaMicrophoneLinesSlash,
      FaViadeo,
      FaVideo,
      FaVideoSlash,
} from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import Dragable from './Dragable';

const Videocall = () => {
      const { isInCall, endCall, isMinimized, toggleMinimized, userId } = usecallStore();
      const { socket } = authstore();
      const videoRef = useRef(null);
      const streamRef = useRef(null);
      const [error, setError] = useState(null);

      const dragRef = useRef(null);
      const [isMute, setisMute] = useState(true);
      const [isVideo, setIsVideo] = useState(true);

      // Start media stream
      const startStream = useCallback(async () => {
            if (streamRef.current) return;
            try {
                  const mainStream = await navigator.mediaDevices.getUserMedia({
                        video: isVideo,
                        audio: isMute,
                  });
                  streamRef.current = mainStream;
                  if (videoRef.current) {
                        videoRef.current.srcObject = mainStream;
                  }
            } catch (err) {
                  console.error('Error accessing media devices:', err);
                  setError('Failed to access camera/microphone.');
            }
      }, [isVideo, isMute]);

      useEffect(() => {
            if (!socket) return;

            socket.on(chatEventEnum.VIDEO_CALL_ACCEPT_EVENT, (callerId, ans) => {
                  console.log(callerId, ans);

                  peer.setLocalDescription(ans);
            });
      }, [socket]);

      useEffect(() => {
            if (isInCall) {
                  startStream();
            } else {
                  if (streamRef.current) {
                        streamRef.current.getTracks().forEach((track) => track.stop());
                        streamRef.current = null;
                  }
            }
            return () => {
                  if (streamRef.current) {
                        streamRef.current.getTracks().forEach((track) => track.stop());
                        streamRef.current = null;
                  }
            };
      }, [isInCall, startStream]);

      const endcall = () => {
            if (streamRef.current) {
                  streamRef.current.getTracks().forEach((track) => track.stop());
                  streamRef.current = null;
            }
            endCall();
      };

      const handelMute = () => {
            setisMute(!isMute);
      };
      const handelVideo = () => {
            setIsVideo(!isVideo);
      };

      if (!isInCall) return null;

      return (
            <Dragable ref={dragRef} isMinimized={isMinimized}>
                  {/* Header */}
                  <div className={`${isMinimized ? 'w-80 h-56' : 'w-screen h-screen'} `}>
                        <div
                              className="flex justify-between items-center p-2 bg-gray-800"
                              style={{ cursor: isMinimized ? 'grab' : 'default' }}
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
                                          {isMinimized ? <Expand /> : <Minimize />}
                                    </button>
                                    <button
                                          onClick={(e) => {
                                                e.stopPropagation();
                                                endcall();
                                          }}
                                          className="text-sm bg-red-500 px-2 py-1 rounded"
                                    >
                                          <MdClose />
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
                                          className=" w-screen h-full  aspect-video object-contain "
                                    />
                              )}
                        </div>

                        {/* footer */}
                        <div className="fixed  bottom-10 w-full ">
                              <div className="flex items-center justify-center p-2 w-full  gap-8">
                                    <button
                                          onClick={handelMute}
                                          className="text-white bg-slate-900 rounded-full p-4"
                                    >
                                          {isMute ? (
                                                <FaMicrophone size={25} />
                                          ) : (
                                                <FaMicrophoneLinesSlash
                                                      size={25}
                                                      className="text-red-500"
                                                />
                                          )}
                                    </button>

                                    <button
                                          onClick={handelVideo}
                                          className="text-white bg-slate-900 rounded-full p-4"
                                    >
                                          {isVideo ? (
                                                <FaVideo size={25} />
                                          ) : (
                                                <FaVideoSlash size={25} className="text-red-500" />
                                          )}
                                    </button>
                              </div>
                        </div>
                  </div>
            </Dragable>
      );
};

export default Videocall;
