require('dotenv').config();
const server = require('./src/app');
const http = require('http');

const { initSocketServer } = require('./src/sockets/socket.server');
const httpServer = http.createServer(server);
initSocketServer(httpServer);

const PORT = process.env.PORT || 3005

httpServer.listen(PORT, () => {
    console.log(`AI Buddy Service is running on port ${PORT}`);
});