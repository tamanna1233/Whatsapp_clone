import { create } from 'zustand';
import { authstore } from './authstore';
import { chatEventEnum } from '@/constants';
import peer from '@/services/peer';
export const usecallStore = create((set) => ({
      userId: '',
      isInCall: false,
      isMinimized: false,
      startCall: async (userId) => {
            const socket = authstore.getState().socket;
            const offer = await peer.getoffer();
            console.log(offer);
            set({ isInCall: true, isMinimized: false, userId: userId });
            if (!socket) {
                  console.log('socket is not available');
            }

            socket.emit(chatEventEnum.VIDEO_CALL_OFFER_EVENT, userId, offer);
      },
      acceptcall: () => {
            set({ isInCall: true, isMinimized: false });
      },
      endCall: () => set({ isInCall: false, isMinimized: false }),
      toggleMinimized: () => {
            set((state) => ({ isMinimized: !state.isMinimized }));
      },
}));
