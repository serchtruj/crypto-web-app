const express = require('express');
const http = require('http');
const { initWebSocket } = require('./websocketHandler');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Initialize WebSocket
const wss = initWebSocket(server);

// Start the server
server.listen(PORT, () => {
    console.log(`WebSocket server started on port: http://localhost:${PORT}`);
});