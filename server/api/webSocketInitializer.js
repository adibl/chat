
class WebSocketInitializer {

    constructor(io, connectionHandler) {
        this._io = io;
        this._connectionHandler = connectionHandler
        io.on("connect", (ws) => {
            console.log("connection");
            this._connectionHandler.addUser(ws);
        });
    }

    async sendMessage(usernames, message, type="message") {
        if (! message instanceof String) {
            message = JSON.stringify(message);
        }
        let sockets = this._connectionHandler.getConnections(usernames);
        for (let socket of sockets) {
            await this._io.to(socket).emit(type, message);
            console.log("send to " + socket);
        }
    }
}

module.exports = WebSocketInitializer;
