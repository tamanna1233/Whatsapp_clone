import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { authstore } from './store/authstore';
import { Button } from './components/ui/button';
import Signup from './components/Signup';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import AppSidebar from './components/Sidebar';

function App() {
    const { login } = authstore();
    useEffect(() => {
        login();
    }, [login]);

    return (
        <>
            <div className="">
                <SidebarProvider>
                    <SidebarTrigger />
                    <AppSidebar />
                    <SidebarInset className="">
                       
                    </SidebarInset>
                </SidebarProvider>
               
            </div>
        </>
    );
}

export default App;
