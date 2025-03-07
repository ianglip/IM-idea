const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users
const users = {};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle user joining
  socket.on('user_join', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('user_joined', username);
    io.emit('update_users', Object.values(users));
  });

  // Handle chat messages
  socket.on('chat_message', (msg) => {
    io.emit('chat_message', {
      user: users[socket.id],
      message: msg,
      time: new Date().toLocaleTimeString()
    });
  });

  // Handle typing indicator
  socket.on('typing', () => {
    socket.broadcast.emit('typing', users[socket.id]);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    socket.broadcast.emit('user_left', users[socket.id]);
    delete users[socket.id];
    io.emit('update_users', Object.values(users));
    console.log('A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to use the app`);
});
