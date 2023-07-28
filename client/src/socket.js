const WEB_SOCKET_API = process.env.REACT_APP_WEB_SOCKET_API
const maxReconnectDelay = 80000; // Maximum time delay between reconnection attempts
let currentReconnectDelay = 1000;

const createWebSocket = (onMessageCallback, onErrorCallback) => {
    let ws;
    let isFirstConnection = true; // Flag to track the first connection

    const connectWebSocket = () => {
        ws = new WebSocket(WEB_SOCKET_API);

        ws.onopen = () => {
            if (isFirstConnection) {
                console.log('WebSocket connection established.');
                isFirstConnection = false;
            }
            ping()
        };

        ws.onmessage = (event) => {
            onMessageCallback(event.data);
            ping()
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            onErrorCallback(error.message);
            clearTimeout(ws.pingTimeout);
            reconnectWebSocket();
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            clearTimeout(ws.pingTimeout);
            reconnectWebSocket();
        };
    }

    const heartbeat = (ws, delay) => {
        clearTimeout(ws.pingTimeout);

        ws.pingTimeout = setTimeout(() => {
            ws.close();
        }, delay);
    };

    const ping = () => {
        heartbeat(ws, 5000);
    };

    const reconnectWebSocket = () => {
        if (currentReconnectDelay <= maxReconnectDelay) {
            setTimeout(() => {
                connectWebSocket();
                currentReconnectDelay *= 2; // Increase the reconnection delay for the next attempt
            }, currentReconnectDelay);
        }
    };

    connectWebSocket();

    return ws;
}

export default createWebSocket;