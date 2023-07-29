const express = require('express');
const http = require('http');
const { initWebSocket } = require('./websocketHandler');
const cors = require('cors')
const cryptocurrenciesRoutesV1 = require('./v1/routes/cryptocurrenciesRoutes')

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000',
}));


// Initialize WebSocket
const wss = initWebSocket(server);

app.use("/api/v1", cryptocurrenciesRoutesV1);

// Start the server
server.listen(PORT, () => {
    console.log(`WebSocket server started on port: http://localhost:${PORT}`);
});