import { axiosInstances } from '@/services/axios';
import { create } from 'zustand';

export const usemessage = create((set) => ({
    messages: [],
    isMessageSend:true,
    getallmessage: async (chatId) => {
        if (!chatId) return;
        const res = await axiosInstances.get(`message/getallmessage/${chatId}`);
        set((state) => ({
            messages: Array.isArray(res.data.data) ? [...res.data.data].reverse() : state.messages,
        }));
    },
    sendmessage: async (chatId, data) => {
        if (!chatId) return;
    set({isMessageSend:false})
        const res = await axiosInstances.post(`message/sendmessage/${chatId}`, data);
        if(res.data.success){
            set({isMessageSend:true}) 
        }
    },
}));
