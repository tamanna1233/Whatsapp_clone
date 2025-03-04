import { chatEventEnum } from '@/constants';
import peer from '@/services/peer';
import { authstore } from '@/store/authstore';
import { usecallStore } from '@/store/useCallStore';
import { CircleGauge, Expand, Minimize } from 'lucide-react';
import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { FaMicrophone, FaMicrophoneLinesSlash, FaVideo, FaVideoSlash } from 'react-icons/fa6';
import { MdClose, MdNetworkPing } from 'react-icons/md';
import Dragable from './Dragable';
import IncomingVideocall from './Imcomingvideocal';
import ReactPlayer from 'react-player';

const Videocall = () => {
     
     
      
      const {
            isInCall,
            endCall,
            isMinimized,
            toggleMinimized,
            userId,
            Stream,
            startStream,
            error,
            sendStream,
            isVideo,
            isAudio,
            endStream,
            setIsVideo,
            setCallAccepted,
            callAccpeted

      } = usecallStore();
      const { socket,authUser } = authstore();
      const videoRef = useRef(null);
      const remoteStreamRef = useRef(null);


      const handleAcceptCall = useCallback(
            async (callerID, answer) => {

                  setCallAccepted()

                  try {
                        if(Stream){

                              sendStream();
                        }
                        // Ensure local description is set after adding tracks
                        await peer.setLocalDescription(answer);
                  } catch (error) {
                  }
            },
            [Stream],
      );

      const handleTrackEvent = async (event) => {
            if (event.streams && event.streams[0]) {
                  try {
                        if (remoteStreamRef.current) {
                              remoteStreamRef.current.srcObject = event.streams[0];

                              // Ensure the video plays after setting the source
                              remoteStreamRef.current.onloadedmetadata = () => {
                                    remoteStreamRef.current.play().catch((error) => {
                                          console.error('Error auto-playing remote video:', error);
                                    });
                              };
                        }
                  } catch (error) {
                        console.error('Error setting remote stream:', error);
                  }
            }
      };

      const handelnogation = useCallback(async () => {
            const offer = await peer.getoffer();
            if(!socket)return
            socket.emit(chatEventEnum.NAGOTION_NEEDED, userId, offer);
      }, [userId, socket]);

      const handleIncomingNego = useCallback(
            async (id, offer) => {
                  const ans = await peer.getAnswer(offer);
                  socket.emit(chatEventEnum.NAGONETIONDONE, id, ans);
            },
            [socket],
      );

      const handelfinal = useCallback(async (ans) => {
            await peer.setLocalDescription(ans);
      }, []);

      useEffect(() => {
            peer.peer.addEventListener('negotiationneeded', handelnogation);

            return () => {
                  peer.peer?.removeEventListener?.('negotiationneeded', handelnogation);
            };
      }, [handelnogation,peer,Stream]);

      // Handle Incoming Remote Stream
      useEffect(() => {
            peer.peer.addEventListener('track', handleTrackEvent);
            return () => {
                  peer.peer.removeEventListener('track', handleTrackEvent);
            };
      }, [sendStream,Stream]);
const handelremoteEndCall=()=>{
}

      // Handle Video Call Events
      useEffect(() => {
            if (!socket) return;

            socket.on(chatEventEnum.VIDEO_CALL_ACCEPT_EVENT, handleAcceptCall);
            socket.on(chatEventEnum.VIDEO_CALL_END_EVENT, handelremoteEndCall);

            socket.on(chatEventEnum.NAGOTION_NEEDED, handleIncomingNego);
            socket.on(chatEventEnum.FINALNAGOTION, handelfinal);
            return () => {
                  socket.off(chatEventEnum.VIDEO_CALL_ACCEPT_EVENT, handleAcceptCall);
                  socket.off(chatEventEnum.VIDEO_CALL_END_EVENT, handelremoteEndCall);
                  socket.off(chatEventEnum.NAGOTION_NEEDED, handleIncomingNego);
                  socket.off(chatEventEnum.FINALNAGOTION, handelfinal);

            };
      }, [socket]);

      // Start/Stop Stream When Call Starts or Ends
      useEffect(() => {
            if (isInCall && !Stream) {
                  startStream();


            }

            return () => {
                  endStream();
            };
      }, [isInCall]); // Remove `Stream` from dependencies

      useEffect(()=>{
            if(Stream&&videoRef.current){
                  videoRef.current.srcObject=Stream
            }
      },[Stream])

      useEffect(() => {
            if (Stream) {
                  sendStream();
            }
      }, [Stream, sendStream, handelfinal, handleAcceptCall]); // Runs when Stream is updated

      useEffect(() => {
            if (remoteStreamRef.current && remoteStreamRef.current.srcObject) {
                  remoteStreamRef.current.play().catch((error) => {
                  });
            }
      }, [remoteStreamRef.current?.srcObject]);


  
      // End Call
      const handleEndCall = () => {
            endCall();
      };

 
      if (!isInCall) return null;

      const RemoteStream = () => {
            return (
                  <>
                        <Dragable
                              isMinimized={true}
                              className="border-2  w-80 relative  top-0 right-10 bg-black"
                        >
                              <div className="flex justify-center items-center flex-col ">
                                    <video
                                          ref={remoteStreamRef}
                                          autoPlay
                                          playsInline
                                          className=" h-auto aspect-video object-cover rounded-lg "
                                    />
                              </div>
                        </Dragable>
                  </>
            );
      }

      return (
            
          
                  <Dragable isMinimized={isMinimized}>
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
                                                      handleEndCall();
                                                }}
                                                className="text-sm bg-red-500 px-2 py-1 rounded"
                                          >
                                                <MdClose />
                                          </button>
                                    </div>
                              </div>
                              <div className="">
                                    {/* Video Display */}
                                    <div className="flex items-center justify-center w-full h-full">
                                          {error ? (
                                                <p className="text-red-500 text-center px-4">
                                                      {error}
                                                </p>
                                          ) : (
                                                <div className="">
                                                      <video
                                                            ref={videoRef}
                                                            autoPlay
                                                            playsInline
                                                            className="w-screen h-screen aspect-video object-contain"
                                                      />
                                                      
                                                       {/* <ReactPlayer
                                                       url={Stream}
                                                       playing={true}
                                                       muted
                                                       /> */}
                                                </div>
                                          )}
                                    </div>

                                    <div className="z-50  absolute left-20 top-20">
                                          <RemoteStream />
                                    </div>
                              </div>
                              {/* Footer Controls */}
                              <div className="fixed bottom-10 w-full">
                                    { 
                                    !callAccpeted && (
                                          <div className="aboslute left-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2 animate-bounce text-white text-center">
                                                <button className="bg-red-600 p-3 rounded-2xl">
                                                      Ringing...
                                                </button>
                                          </div>
                                    )}
                                    <div className="flex items-center justify-center p-2 w-full gap-8">
                                          <button className="text-white bg-slate-900 rounded-full p-4">
                                                {isAudio ? (
                                                      <FaMicrophone size={25} />
                                                ) : (
                                                      <FaMicrophoneLinesSlash
                                                            size={25}
                                                            className="text-red-500"
                                                      />
                                                )}
                                          </button>

                                          <button
                                                className="text-white bg-slate-900 rounded-full p-4"
                                                onClick={setIsVideo}
                                          >
                                                {isVideo ? (
                                                      <FaVideo size={25} />
                                                ) : (
                                                      <FaVideoSlash
                                                            size={25}
                                                            className="text-red-500"
                                                      />
                                                )}
                                          </button>

                                          <button onClick={endCall}>endCall</button>
                                    </div>
                              </div>
                        </div>
                  </Dragable>

                  
                        
                  
            
      );
}

export default Videocall;
