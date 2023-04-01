const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors())
const PUERTO = 8000;
const socketC = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000/",
        credentials: true,
        methods: ["GET", "POST"]
    }
});

let connectedUSers = []

socketC.on('connection', (socket) => {
    // console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', (data) => {
      console.log('message',data);
      console.log(connectedUSers)
      data = {...data, time: Date().toString().split(" ")[4]}
      socketC.emit('messageResponse', data);
    });

    socket.on('privateMessage', (data) => {
      console.log('message',data);
      console.log(connectedUSers)
      data = {...data, time: Date().toString().split(" ")[4]}
      socketC.to(data.room).emit('messageResponse', data);
    });

    socket.on('login', (data) => {
      connectedUSers.push(data)
      socketC.emit('usersList', connectedUSers)
      socketC.emit('newUser', data.user)
      
    });

    socket.on('loginChannel', (data) => {
      connectedUSers.push(data)

      usersInRoom = connectedUSers.filter((user) => user.room == data.room)
      console.log(usersInRoom)
      socket.join(data.room)
      socketC.to(data.room).emit('usersList', usersInRoom)
      
    });

    socket.on('escribiendo', (data) => {
      socket.broadcast.emit('escribiendoRespuesta', data)
      console.log(data)
    })
  
    socket.on('disconnectChat', (data) => {
      connectedUSers = connectedUSers.filter( user => user.user !== data.user)
      socket.broadcast.emit('usersList', connectedUSers)
      // socket.disconnect();
    });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PUERTO, () => {
  console.log(`Server listening on ${PUERTO}`);
});