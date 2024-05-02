const WebSocket = require('ws');
const ioClient = require('socket.io-client');

const SOCKET_PORT = 3000
const BUDGIE = 'http://localhost:5000'

// Create a WebSocket server
const wss = new WebSocket.Server({port: SOCKET_PORT});

// Connect to Flask Socket.IO server
const flaskSocket = ioClient.connect(BUDGIE);


// Event handler for when a client connects
wss.on('connection', function connection(ws) {
    console.log('A client connected');

    flaskSocket.on('stream_message', (data) => {
        console.log('Received message from Flask:', data);
        ws.send(JSON.stringify(data));
    });

    // // Event handler for when the server receives a message from a client
    // ws.on('message', function incoming(message) {
    //     console.log('Received:', message);
    //
    //     // Echo the received message back to the client
    //     ws.send('Echo: ' + message);
    // });

    // Event handler for when a client closes the connection
    ws.on('close', function () {
        console.log('Client disconnected');
    });
});


console.log('WebSocket server listening on port ' + SOCKET_PORT);
