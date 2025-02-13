import { axiosInstances } from '@/services/axios';
import { create } from 'zustand';
import { authstore } from './authstore';

export const useChat = create((set, get) => ({
      selectedChat: '',
      setSelectedChat: (chatId) => set({ selectedChat: chatId }),
      availableChats: [],
      previousChats: [],
      setpreviousChats: (chat) => set({ previousChats: chat }),
      avialablechats: async () => {
            try {
                  const res = await axiosInstances.get('/chat/availablechats');
                  if (res.data.success) {
                        set({ availableChats: res.data.data });
                  }
            } catch (error) {
                  console.log('avaialable chats error', error.message);
            }
      },
      createorGetOneOnOneChat: async (data) => {
            try {
                  const res = await axiosInstances.get(`chat/createOrGetOneOnOneChat/${data}`);
                  if (res.data.success) {
                        set({ selectedChat: res.data.data });
                  }
            } catch (error) {
                  console.log('error while creating chat', error.message);
            }
      },
      getyourChats: async () => {
            try {
                  const res = await axiosInstances.get('chat/getyourchat');
                  if (res.data.success) {
                        set({ previousChats: res.data.data });
                  } else {
                        console.log('error', res.data.data);
                  }
            } catch (error) {
                  console.log('error', error.message);
            }
      },
}));
