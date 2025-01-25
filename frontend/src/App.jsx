import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import io from "socket.io-client";
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
const [text,settext]=useState()
  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected!');
      setConnected(true);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleDisconnect = () => {
    console.log("Disconnect button clicked");
    if (socket) {
      socket.disconnect();
      setConnected(false);
    }
  };

  console.log(text)
  const handelmessage=()=>{
    socket.emit("messageReceived",text)
  }
  
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
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>
      <button onClick={handleDisconnect}>
        Disconnect
      </button>

      <input type="text" value={text}  onChange={(e)=>{settext(e.target.value)}}></input>
      <button onClick={handelmessage}></button>
    </>
  );
}

export default App;
