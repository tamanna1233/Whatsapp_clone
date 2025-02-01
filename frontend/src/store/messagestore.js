import { create } from 'zustand';

export const usemessageauth = create((set, get) => ({
    selectedChat: '',
}));
