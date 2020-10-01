class WebSocketServices {

    constructor(io, socketConnection, usernamesToSocketIds, logger) {
        this._io = io;
        this._socketConnection = socketConnection;
        this._usernamesToSocketIds = usernamesToSocketIds;
        this._logger = logger;
        io.on("connect", (ws) => {
            this._socketConnection.addUser(ws);
            this._logger.info("connection");
        });
    }

    async sendMessage(usernames, message, type = "message") {
        if (!message instanceof String) {
            message = JSON.stringify(message);
        }
        for (let username of usernames) {
            let userToSockets = await this._usernamesToSocketIds.find({username: username}, 'socketId -_id').lean();
            if (userToSockets) {
                for (let socket of userToSockets.map(obj => obj.socketId)) {
                    await this._io.to(socket).emit(type, message);
                    this._logger.info("send to " + socket);
                }
            }
        }
    }
}

module.exports = WebSocketServices;
