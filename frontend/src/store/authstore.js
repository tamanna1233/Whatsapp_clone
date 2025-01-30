import { create } from 'zustand';
import { axiosInstances } from '../services/axios';
import { io } from 'socket.io-client';
import { toast } from '@/hooks/use-toast';

export const authstore = create((set, get) => ({
    authUser: '', // Current authenticated user
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    isUpdatingProfile: false,
    socket: '',

    /* The `checkCurrentUser` function in the `authstore` zustand store is responsible for checking the
    currently authenticated user. Here's a breakdown of what it does: */
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

  
    /* The `login` function in the `authstore` zustand store is responsible for handling the login
    functionality. Here's a breakdown of what it does: */
    login: async (data) => {
        try {
            const res = await axiosInstances.post('users/login', data);
            console.log('Login successful:', res.data);
            if(res.data.success){

                toast({title:"login sucessfully"})
              
                set({ authUser: res.data });
                get().connectSocket();
            }else{
                toast({title:"login failed",description:error.response?.data?.message||"something went wrong"})
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            toast({title:"login failed",description:error.response?.data?.message||"something went wrong"})
        }
    },

    /* The `signup` function in the `authstore` zustand store is responsible for handling the user
    registration functionality. Here's a breakdown of what it does: */
    signup:async (data) => {
        try {
            
            const res= await axiosInstances.post("/users/register",data,{ headers: {
                'Content-Type': 'multipart/form-data',
              },})
              console.log(res)
              if( res.data.success){
                
                toast({title:"register sucessfully"})
                
              }
              else{
                toast({title:"login failed",description:error.response?.data?.message||"something went wrong "})
            }
            
        } catch (error) {
            console.log(error.response)
            toast({title:"failed registeration ",description:error.response?.data?.message ||"something went wrong"})

        }
        
    },

    // Connect the socket
    /* The `connectSocket` function in the `authstore` zustand store is responsible for establishing a
    socket connection to a specified server. Here's a breakdown of what it does: */
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
