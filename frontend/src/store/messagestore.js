import { axiosInstances } from '@/services/axios';
import { create } from 'zustand';

export const usemessage = create((set, get) => ({
    selectedChat: '',
    isAvialableChats: [],

    avialablechats: async () => {
        try {
            const res = await axiosInstances.get('/message/availablechats');
            if (res.data.success) {
                set({ isAvialableChats: res.data.data });
            }
        } catch (error) {
            console.log('avaialable chats error', error.message);
        }
    },
    setSelectedChat: (chatId) => set({ selectedChat: chatId }),
}));
