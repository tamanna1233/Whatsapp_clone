import { useEffect, useCallback, useState } from 'react';
import './App.css';
import { authstore } from './store/authstore';
import AppSidebar from './components/Sidebar';
import { Outlet } from 'react-router';
import { chatEventEnum } from './constants';
import Setting from './components/Setting';
import Videocall from './components/Videocall';
import IncomingVideocall from './components/Imcomingvideocal';
import { usecallStore } from './store/useCallStore';
import { toast } from './hooks/use-toast';

function App() {
      const { checkCurrentUser, authUser, socket } = authstore();

      const { endCall } = usecallStore();
      
      const [imcomingCall, setIncomingCall] = useState(null);
      const checkUser = useCallback(async () => {
            await checkCurrentUser();
      }, [checkCurrentUser]);

      useEffect(() => {
            checkUser();
            if (!socket) return;

            socket.on(chatEventEnum.VIDEO_CALL_OFFER_EVENT, (data) => {
                  console.log('in coming video call by ', data);
                  setIncomingCall(data);
            });

            socket.on(chatEventEnum.VIDEO_CALL_DECLINE_EVENT, (data) => {
                  console.log(`videocall decline by user`);
                  toast({ title: 'call decline ' });
                  endCall();
            });

            return () => {
                  socket.off(chatEventEnum.VIDEO_CALL_OFFER_EVENT);
            };
      }, [checkUser, socket]); // Removed `socket` from dependencies

      useEffect(() => {
            document.addEventListener('contextmenu', (event) => event.preventDefault());
            return () => {
                  document.removeEventListener('contextmenu', (event) => event.preventDefault());
            };
      }, []);
      return (
            <div className="flex h-screen fixed w-screen font-serif">
                  <Setting />
                  <AppSidebar />
                  <Outlet />
                  <Videocall />

                  {imcomingCall && (
                        <IncomingVideocall
                              caller={imcomingCall.caller}
                              offer={imcomingCall.offer}
                              onClose={() => setIncomingCall(null)}
                        />
                  )}
            </div>
      );
}

export default App;
