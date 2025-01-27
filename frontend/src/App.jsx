import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { authstore } from './store/authstore';
import { Button } from './components/ui/button';
import Signup from './components/Signup';

function App() {
 const {login}=authstore()
 useEffect(()=>{

   login()
 },[login])
  
  return (
    <>
      <div className='bg-[#121212] h-screen w-screen flex justify-center items-center'>
       <Signup/>
      </div>
    
      
    </>
  );
}

export default App;
