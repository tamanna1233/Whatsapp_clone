import { useEffect, useCallback } from 'react';
import './App.css';
import { authstore } from './store/authstore';
import AppSidebar from './components/Sidebar';
import { Outlet } from 'react-router';
import { chatEventEnum } from './constants';

function App() {
    const { checkCurrentUser, authUser, socket } = authstore();

    const checkUser = useCallback(async() => {
       await checkCurrentUser();
    }, [checkCurrentUser]);

    useEffect(() => {
        checkUser();
       if(!socket)return
    }, [checkUser]); // Removed `socket` from dependencies


    return (
        <div className="flex h-screen fixed w-screen font-serif">
            <AppSidebar />
            <Outlet />
        </div>
    );
}

export default App;
