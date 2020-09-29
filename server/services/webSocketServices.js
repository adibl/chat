
class WebSocketServices {

    constructor(io, usernamesToSocketIds) {
        this._io = io;
        this._usernamesToSocketIds = usernamesToSocketIds;
        io.on("connect", (ws) => {
            console.log("connection");
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
                    console.log("send to " + socket);
                }
            }
        }
    }
}

module.exports = WebSocketServices;
