import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import io from "socket.io-client";
import './App.css';
import { authstore } from './store/authstore';

function App() {
  const {authUser}=authstore()
  console.log(authUser)
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    
      
    </>
  );
}

export default App;
