import { chatEventEnum } from '@/constants';
import { authstore } from '@/store/authstore';
<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
=======
import React, { useCallback, useEffect, useRef } from 'react';
>>>>>>> 5d759b8e9ae707086410d3d8ec94f0f83f0f4f39
import ringtone from '../assets/ringtone.m4a';
import peer from '@/services/peer';
import { usecallStore } from '@/store/useCallStore';
const IncomingVideocall = ({ caller, offer, onClose }) => {
      if (!caller) return null; // Don't render if no caller
      const { socket } = authstore();
<<<<<<< HEAD
      const { acceptcall } = usecallStore();
      const audioRef = useRef(null);
      useEffect(() => {
            if (!audioRef) return;
            audioRef.current.play();
=======
      const { acceptCall,sendStream } = usecallStore();
      const audioRef = useRef(null);
      useEffect(() => {
            if (!audioRef.current) return;
>>>>>>> 5d759b8e9ae707086410d3d8ec94f0f83f0f4f39
      }, []);

      const handelDeclinCall = () => {
            socket.emit(chatEventEnum.VIDEO_CALL_DECLINE_EVENT, caller.id);
            onClose();
<<<<<<< HEAD
      };
      const acceptCall = async (offer) => {
            console.log('Accepting call with offer:', offer);
            const acceptoffer = await peer.getAnswer(offer);
            console.log(acceptoffer);
            socket.emit(chatEventEnum.VIDEO_CALL_ACCEPT_EVENT, caller.id, acceptoffer);
            acceptcall();
            onClose();
      };

      return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <audio ref={audioRef} src={ringtone} loop />
=======
      };
      const acceptcall = useCallback(async (offer) => {
            console.log('Accepting call with offer:', offer);
            const acceptoffer = await peer.getAnswer(offer);
            console.log(acceptoffer);
            socket.emit(chatEventEnum.VIDEO_CALL_ACCEPT_EVENT, caller.id, acceptoffer);
            acceptCall();
            
            onClose();
      }, []);

      return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <audio ref={audioRef} src={ringtone} loop autoPlay />
>>>>>>> 5d759b8e9ae707086410d3d8ec94f0f83f0f4f39
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold">Incoming Video Call</h2>
                        <p className="text-gray-700">From: {caller.name}</p>
                        <img
                              src={caller.avatar}
                              alt={caller.name}
                              className="w-16 h-16 rounded-full mx-auto my-2"
                        />

                        <div className="mt-4 space-x-4">
                              <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => acceptcall(offer)}
                              >
                                    Accept
                              </button>
                              <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={handelDeclinCall}
                              >
                                    Reject
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default IncomingVideocall;
