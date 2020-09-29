const BasicDataRequests = require("./basicData");

class usernameToSocketIds extends BasicDataRequests {

    async add(username, socket) {
        let user = this._data.get(username);
        if (user) {
            this._data.set(username, user.add(socket));
        }
        else {
            this._data.set(username, new Set(socket));

        }
    }

    async removeSocket(socket) {
        this._data.forEach((username, sockets) => {
            sockets.delete(socket);
        })
    }

}

module.exports = usernameToSocketIds;