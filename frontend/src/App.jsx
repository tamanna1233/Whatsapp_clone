import { useEffect, useCallback } from 'react';
import './App.css';
import { authstore } from './store/authstore';
import AppSidebar from './components/Sidebar';
import { Outlet } from 'react-router';
import { chatEventEnum } from './constants';
import Setting from './components/Setting';

function App() {
      const { checkCurrentUser, authUser, socket } = authstore();

      const checkUser = useCallback(async () => {
            await checkCurrentUser();
      }, [checkCurrentUser]);

      useEffect(() => {
            checkUser();
            if (!socket) return;
      }, [checkUser]); // Removed `socket` from dependencies
      useEffect(() => {
            document.addEventListener("contextmenu", (event) => event.preventDefault());
            return () => {
              document.removeEventListener("contextmenu", (event) => event.preventDefault());
            };
          }, []);
      return (
            <div className="flex h-screen fixed w-screen font-serif">
                  <Setting />
                  <AppSidebar />
                  <Outlet />
            </div>
      );
}

export default App;
