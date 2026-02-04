const { Server } = require("socket.io");
const http = require("http");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

async function initSocketServer(httpServer) {

    const io = new Server(httpServer, {});

    io.use((socket, next) => {
        const cookies = socket.handshake.headers?.cookie;
        const { token } = cookies ? cookie.parse(cookies) : {};
    
        if (!cookies) {
            return next(new Error('No token provided'));
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;

            next();
            
        } catch (error) {
            return next(new Error('Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
    });
}

module.exports = { initSocketServer };