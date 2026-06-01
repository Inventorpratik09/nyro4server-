const { WebSocketServer } = require('ws');
const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });

console.log(`[SERVER START] Nyro Cloud Bridge active on port ${port}`);

wss.on('connection', (ws) => {
    console.log('[CONNECT] Device connected to Nyro Cloud successfully.');

    ws.on('message', (message) => {
        const data = message.toString();
        console.log(`[BROADCAST] Data received: ${data}`);
        
        // Forward the received text to all other connected devices (Pi/Dashboard)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(data);
            }
        });
    });

    ws.on('close', () => {
        console.log('[DISCONNECT] A device disconnected from the server.');
    });
});
