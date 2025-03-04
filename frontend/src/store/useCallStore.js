import { create } from 'zustand';
import { authstore } from './authstore';
import { chatEventEnum } from '@/constants';
import peer from '@/services/peer';
export const usecallStore = create((set, get) => ({
      userId: '',
      isInCall: false,
      isMinimized: false,
      isAudio: true,
      isVideo: true,
      Stream: null,
      error: false,
      callAccpeted:true,
    /* The `startCall` function in the provided code is responsible for initiating a video call. Here
    is a breakdown of what it does: */
      startCall: async (userId) => {
            const socket = authstore.getState().socket;
            if (!socket) {
                  return;
            }
            const offer = await peer.getoffer();           
            set({ isInCall: true, isMinimized: false, userId: userId ,callAccpeted:false});

            socket.emit(chatEventEnum.VIDEO_CALL_OFFER_EVENT, userId, offer);
      },
    /* The `acceptCall` function in the provided code is setting the state of the call to indicate that
    the user has accepted the incoming call. It updates the state by setting `isInCall` to `true`
    and `isMinimized` to `false`, which means that the user is currently in a call and the call
    window is not minimized. */
      acceptCall: (caller,acceptoffer) => {
            const socket = authstore.getState().socket;
            if(socket){
                  socket.emit(chatEventEnum.VIDEO_CALL_ACCEPT_EVENT, caller.id, acceptoffer);  
            }
            set({ isInCall: true, isMinimized: false });
      },
    /* The `endCall` function in the provided code is responsible for ending a call. Here is a
    breakdown of what it does: */
      endCall: () => {
            
            get().endStream()
            set({ isInCall: false, isMinimized: false });
      },

    /* The `toggleMinimized` function in the provided code is responsible for toggling the state of the
    `isMinimized` property. When this function is called, it will invert the current value of
    `isMinimized` from `true` to `false` or from `false` to `true`, effectively toggling the
    minimized state of the call window. */
      toggleMinimized: () => {
            set((state) => ({ isMinimized: !state.isMinimized }));
      },

     /* The `setIsAudio` function in the provided code is a function that toggles the state of the
     `isAudio` property in the store. When this function is called, it uses the `set` function
     provided by Zustand to update the state. */
      setIsAudio: async () => {
            set((state) => ({ isAudio: !state.isAudio }));
      },

    /* The `setIsVideo` function in the provided code is a function that toggles the state of the
    `isVideo` property in the store. When this function is called, it uses the `set` function
    provided by Zustand to update the state. */
    setIsVideo: async () => {
  
      set((state) => ({isVideo:!state.isVideo}));

      if(!get().isVideo){

            const stream=get().Stream
            if(stream){
                  stream.getVideoTracks().forEach(track=>track.stop())
            }
            
      }
      else{
            try {
                  const newstream=await navigator.mediaDevices.getUserMedia({video:true,audio:true})
                  const stream=get().Stream
                  const videoTrack=newstream.getVideoTracks()[0]
                  if(stream){
                        stream.getVideoTracks().forEach(track=>stream.removeTrack(track))
                        stream.addTrack(videoTrack)

                        set({Stream:stream})
                  }else{
                        set({Stream:newstream})
                  }
                  
            } catch (error) {
                  console.log(`error while seting new video stream ${error.message}`)
                  
            }
      }
  },
  
  setCallAccepted:()=>{
      console.log("call accpeted")
 set({callAccpeted:true})
  },

   /* The `startStream` function in the provided code is responsible for starting a media stream for
   video and audio. Here is a breakdown of what it does: */
      startStream: async () => {
            try {
                  set({ error: false });
                  if (get().Stream) return;
                  const mainStream = await navigator.mediaDevices.getUserMedia({
                        video: get().isVideo,
                        audio: get().isAudio,
                  }); 
                  set({ Stream: mainStream });
            } catch (error) {
                  console.log(` error while streaming message :${error.message}`);
                  set({ error: error.message });
            }
      },

   /* The `sendStream` function in the provided code is responsible for sending the media stream to the
   peer during a call. Here is a breakdown of what it does: */
      sendStream: async () => {
            const stream = get().Stream;
            if (stream ) {
                  stream.getTracks().forEach((track) => {
                        if (!peer.peer.getSenders().find(sender => sender.track === track)) {
                              peer.peer.addTrack(track, stream);
                          }
                          
                  });
            }
      },

   /* The `endStream` function in the provided code is responsible for ending the media stream. Here is
   a breakdown of what it does: */
      endStream: async () => {
            const stream = get().Stream;
            if (stream) {
                  stream.getTracks().forEach((track) => track.stop());
                  set({ Stream: null });
            }
      },
}));
