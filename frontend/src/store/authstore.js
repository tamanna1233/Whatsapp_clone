import { create } from 'zustand';
import { axiosInstances } from '../services/axios';
import { io } from 'socket.io-client';

export const authstore = create((set, get) => ({
    authUser: '', // Current authenticated user
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    isUpdatingProfile: false,
    socket: '',

    // Check the currently authenticated user
    checkCurrentUser: async () => {
        try {
            set({ isCheckingAuth: true });
            const res = await axiosInstances.get('/getcurrentuser');
            set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
            console.error(`Error while checking auth: ${error.message}`);
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    // Login user
    login: async () => {
        try {
            const res = await axiosInstances.post('users/login', {
                phoneNo: 8628047655,
                password: '12345678',
            });
            console.log('Login successful:', res.data);

            // Set the authenticated user and connect the socket
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
        }
    },

    signup:async (data) => {
        try {
            
            const res=axiosInstances("/users/register",data)
            
        } catch (error) {
            console.log(error.res)
        }
        
    },

    // Connect the socket
    connectSocket: () => {
        console.log('Checking socket connection...');
        const { authUser, socket } = get();

        // Ensure the user is authenticated and the socket isn't already connected
        if (!authUser || (socket && socket?.connected)) return;

        const newSocket = io('http://localhost:8000', { withCredentials: true });

        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        set({ socket: newSocket });
    },
}));
