
class WebSocketServices {

    constructor(io, usernamesToSocketIds, logger) {
        this._io = io;
        this._usernamesToSocketIds = usernamesToSocketIds;
        this._logger = logger;
        io.on("connect", (ws) => {
            this._logger.info("connection");
        });
    }

    async sendMessage(usernames, message, type="message") {
        if (! message instanceof String) {
            message = JSON.stringify(message);
        }
        for (let username of usernames) {
            let sockets = await this._usernamesToSocketIds.get(username);
            if (sockets) {
                for (let socket of sockets) {
                    await this._io.to(socket).emit(type, message);
                    this._logger.info("send to " + socket);
                }
            }
        }
    }
}

module.exports = WebSocketServices;
