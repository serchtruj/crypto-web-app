const WebSocket = require('ws');

const initWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });
    const tradeWssUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade/ethusdt@trade/adausdt@trade";

    // Function to send real-time data to all connected clients
    const sendRealTimeDataToClients = (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    };

    getDataWebSocket(tradeWssUrl, "Trade", sendRealTimeDataToClients);

    const heartbeat = (ws) => {
        ws.isAlive = true
    }
    const ping = (ws) => { }

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.isAlive = true;
        ws.on('pong', () => { heartbeat(ws) });
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    // Interval for checking WebSocket connections and sending pings
    setInterval(() => {
        wss.clients.forEach((ws) => {
            if (ws.isAlive === false) {
                return ws.terminate();
            }

            ws.isAlive = false;
            ws.ping(() => {
                ping(ws);
            });
        });
    }, 30000);

    return wss;
};

function getDataWebSocket(wssUrl, type, sendRealTimeDataToClients) {
    const tickerWebSocket = new WebSocket(wssUrl);

    tickerWebSocket.onopen = () => {
        console.log(`Connected to ${type} WebSocket`);
    };

    tickerWebSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const receivedData = {
            symbol: data.s,
            price: data.p
        };
        sendRealTimeDataToClients(receivedData);
    };

    tickerWebSocket.onclose = () => {
        console.log(`${type} WebSocket connection closed`);
    };

};

module.exports = { initWebSocket }; 