const app = require('./app');
const config = require('./config/config');
const http = require('http');
const { Server } = require('socket.io');
const setupSocketHandlers = require('./socketHandler');

const PORT = config.port;

const server = http.createServer(app);
const io = new Server(server);

app.set('io', io);

setupSocketHandlers(io);

server.listen(PORT, () => {
    console.log(`
========================================
🚀 Server is running!
========================================
Environment: ${config.nodeEnv}
Port: ${PORT}
URL: http://localhost:${PORT}
API: http://localhost:${PORT}/api
========================================
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

module.exports = { server, io };
