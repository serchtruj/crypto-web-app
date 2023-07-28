const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function sendRealTimeDataToClients(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

wss.on('connection', (ws) => {
    console.log('Client connected');

    setInterval(() => {
        const sampleData = {
            symbol: 'ETHUSDT',
            price: Math.random() * 100,
        };
        sendRealTimeDataToClients(sampleData);
    }, 2000);

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
