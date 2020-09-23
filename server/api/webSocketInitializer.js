let socketConnections = require('./webSocket/connection');

class WebSocketInitializer {
    static Instance;

    constructor(io) {
        this._io = io;
        io.on("connect", (ws) => {
            console.log("connection");
            socketConnections.addUser(ws);
        });

        WebSocketInitializer.Instance = this;
    }

    static getInstance(io = null) {
        if (!WebSocketInitializer.Instance && io) {
            WebSocketInitializer.Instance = new WebSocketInitializer(io);
        }

        return WebSocketInitializer.Instance;
    }

    async sendMessage(conversationId, usernames, message, type="message") {
        let sockets = socketConnections.getConnections(usernames);
        for (let socket of sockets) {
            await this._io.to(socket).emit(`${type}:${conversationId}`, JSON.stringify(message));
            console.log("send to " + socket);
        }
    }
}

module.exports = WebSocketInitializer;
