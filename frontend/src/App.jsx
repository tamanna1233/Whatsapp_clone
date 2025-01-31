import { useEffect, useState } from 'react';

import './App.css';
import { authstore } from './store/authstore';

import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import AppSidebar from './components/Sidebar';

function App() {
    /* This code snippet is using React's `useEffect` hook to call the `checkCurrentUser` function from
    the `authstore` object when the component mounts or when the `checkCurrentUser` function
    changes. */
    const { checkCurrentUser ,authUser,socket} = authstore();
    console.log(authUser,socket)
    useEffect(() => {
        checkCurrentUser();
    }, [checkCurrentUser]);

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
