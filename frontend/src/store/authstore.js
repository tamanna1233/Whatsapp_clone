import { create } from 'zustand';
import { axiosInstances } from '../services/axios';
import { io, Socket } from 'socket.io-client';
import { toast } from '@/hooks/use-toast';
import { data, useNavigate } from 'react-router';
import { chatEventEnum } from '@/constants';
export const authstore = create((set, get) => ({
      authUser: '',
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
                  const res = await axiosInstances.get('/users/currentuser');
                  set({ authUser: res.data.data, isCheckingAuth: false });
                  get().connectSocket();
            } catch (error) {
                  console.error(`Error while checking auth: ${error.message}`);
                  set({ authUser: null, isCheckingAuth: false });
            }
      },

      // logout

      logout: async () => {
            try {
                  const res = await axiosInstances.get('users/logout');
                  if (res.data.success) {
                        console.log(res.data);
                        set({ authUser: null });
                  }
            } catch (error) {
                  console.error('Error while logging out');
            }
      },
      // delete user
      deleteuser: async () => {
            try {
                  const res = await axiosInstances.delete('users/deleteuser');
                  if (res.data.success) {
                        console.log(res.data);
                        set({ authUser: null });
                  }
            } catch (error) {
                  console.error('Error while deleting user');
            }
      },

      /* The `login` function in the `authstore` zustand store is responsible for handling the login
    functionality. Here's a breakdown of what it does: */
      login: async (data, navigate) => {
            try {
                  const res = await axiosInstances.post('users/login', data);
                  console.log('Login successful:', res.data);
                  if (res.data.success) {
                        toast({ title: 'login sucessfully' });
                        navigate('/');
                        set({ authUser: res.data.user });
                        get().connectSocket();
                  } else {
                        toast({
                              title: 'login failed',
                              description: error.response?.data?.message || 'something went wrong',
                        });
                  }
            } catch (error) {
                  console.error('Login error:', error.response?.data || error.message);
                  toast({
                        title: 'login failed',
                        description: error.response?.data?.message || 'something went wrong',
                  });
            }
      },

      /* The `signup` function in the `authstore` zustand store is responsible for handling the user
    registration functionality. Here's a breakdown of what it does: */
      signup: async (data) => {
            try {
                  const res = await axiosInstances.post('/users/register', data, {
                        headers: {
                              'Content-Type': 'multipart/form-data',
                        },
                  });
                  console.log(res);
                  if (res.data.success) {
                        toast({ title: 'register sucessfully' });
                  } else {
                        toast({
                              title: 'login failed',
                              description: error.response?.data?.message || 'something went wrong ',
                        });
                  }
            } catch (error) {
                  console.log(error.response);
                  toast({
                        title: 'failed registeration ',
                        description: error.response?.data?.message || 'something went wrong',
                  });
            }
      },

      updateProfile: async (data) => {
            console.log(data);
            try {
                  const res = await axiosInstances.patch('users/updateuser', data);
                  if (res.data.success) {
                        toast({
                              title: ' profile updated ',
                        });
                  } else {
                        toast({
                              title: 'failed  ',
                              description: error.response?.data?.message || 'something went wrong',
                        });
                  }
            } catch (error) {
                  console.log(error.response);
            }
      },
      // Connect the socket
      /* The `connectSocket` function in the `authstore` zustand store is responsible for establishing a
    socket connection to a specified server. Here's a breakdown of what it does: */
      connectSocket: () => {
            const { authUser, socket } = get();

            if (!authUser || (socket && socket?.connected)) return;

            // Create a new socket connection
            const newSocket = io('http://localhost:8000', { withCredentials: true });

            console.log('Checking socket connection...');
            newSocket.on('connect', () => {
                  console.log('Socket connected successfully');
                  set({ socket: newSocket });
            });

            newSocket.on('disconnect', () => {
                  console.log('Socket disconnected');
                  set({ socket: null });
            });

            newSocket.on('connect_error', (error) => {
                  console.error('Socket connection error:', error);
            });

            // // Save the new socket instance
            // set({ socket: newSocket });
      },
}));
