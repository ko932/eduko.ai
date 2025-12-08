// Minimal signalling relay using socket.io
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.on('join-session', ({sessionId}) => {
    socket.join(sessionId);
    socket.sessionId = sessionId;
    console.log(`${socket.id} joined ${sessionId}`);
  });

  socket.on('signal', ({ sessionId, payload }) => {
    // broadcast to others in same session
    socket.to(sessionId).emit('signal', { from: socket.id, payload });
  });

  socket.on('disconnect', ()=> {
    console.log('disconnect', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=> console.log('Signalling server listening on', PORT));
