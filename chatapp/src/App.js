import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Home from './Home';
import ChatContainer from './Chat/ChatContainer'
import { Helmet } from 'react-helmet';


var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

// const socket = socketIO.connect('https://chat-server-xm1l.onrender.com/', connectionOptions)
const socket = socketIO.connect('http://localhost:8000/', connectionOptions)
function App() {
  return (
    
    
    <BrowserRouter>
    <Helmet>
        <title>Chat</title>
    </Helmet>
    <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatContainer socket={socket} />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
