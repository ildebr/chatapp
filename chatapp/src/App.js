import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Home from './Home';
import ChatContainer from './Chat/ChatContainer'


var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

const socket = socketIO.connect('ws://localhost:8000/', connectionOptions)
function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatContainer socket={socket} />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
