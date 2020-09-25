class SocketConnections {
    constructor() {
        this._users = [];
    }

    addUser(socket) {
        socket.on('login', (username) => {
            if (this._users.find((user) => user.username === username)) {
                this._users.find((user) => user.username === username).socketIds.add(socket.id);
            }
            else {
                this._users.push({username: username, socketIds: new Set([socket.id])});
            }

            console.log(`${username} logged in`);
        });

        socket.on('disconnect', () => {
            let index = this._users.findIndex((user) => user.socketIds.has(socket.id));
            let user = this._users[index];
            if (user) {
                user.socketIds.delete(socket.id);
                console.log(`user ${user.username} logged out`);
            }
        });
    }

    getConnections(usernames) {
        usernames = new Set(usernames);
        let ids = this._users.filter((user) => usernames.has(user.username)).map(user => [...user.socketIds]).flat(1);
        return new Set(ids);
    }
}

module.exports = SocketConnections;
