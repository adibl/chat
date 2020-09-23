let socketConnections = require('./webSocket/connection');

class WebSocketServices {
    static Instance;

    constructor(io) {
        this._io = io;
        io.on("connect", (ws) => {
            console.log("connection");
            socketConnections.addUser(ws);
        });

        WebSocketServices.Instance = this;
    }

    static getInstance(io = null) {
        if (!WebSocketServices.Instance && io) {
            WebSocketServices.Instance = new WebSocketServices(io);
        }

        return WebSocketServices.Instance;
    }

    async sendMessage(conversationId, usernames, message) {
        let sockets = socketConnections.getConnections(usernames);
        for (let socket of sockets) {
            await this._io.to(socket).emit(`message:${conversationId}`, JSON.stringify(message));
            console.log("send to " + socket);
        }
    }
}

module.exports = WebSocketServices;
