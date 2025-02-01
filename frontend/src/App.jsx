import { useEffect, useCallback } from 'react';
import './App.css';
import { authstore } from './store/authstore';
import AppSidebar from './components/Sidebar';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar';
import { Outlet } from 'react-router';

function App() {
    const { checkCurrentUser, authUser, socket } = authstore();

    console.log(authUser, socket);

    const checkUser = useCallback(() => {
        checkCurrentUser();
    }, [checkCurrentUser]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    return (
        <div className="flex h-screen fixed w-screen">
            <AppSidebar />
            <Outlet />
        </div>
    );
}

export default App;
