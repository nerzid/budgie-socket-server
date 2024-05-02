// Express.js app

const CHATBOT_FRONTEND = 'http://localhost:8000'
const BUDGIE = 'http://localhost:5000'
// const CHATBOT_FRONTEND = 'http://project_doctor:8000'
// const BUDGIE = 'http://budgie-api:5000'
const BUDGIE_SOCKET_SERVER_PORT = 3000

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const ioClient = require('socket.io-client');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*", // Update to match the URL of your Django app
        methods: ["GET", "POST"]
    }
});

// Use CORS
app.use(cors({
    origin: CHATBOT_FRONTEND, // Update to match the URL of your Django app
    credentials: true,
}));

// Connect to Flask Socket.IO server
const flaskSocket = ioClient.connect(BUDGIE);

flaskSocket.on('stream_message', (data) => {
    console.log('Received message from Flask:', data);
    io.emit('stream_message', data);
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(BUDGIE_SOCKET_SERVER_PORT, () => {
    console.log('Listening on port ' + BUDGIE_SOCKET_SERVER_PORT);
});
