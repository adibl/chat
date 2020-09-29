class SocketConnections {
    constructor() {
        this._users = [];
    }

    addUser(socket) {
        socket.on('login', (username) => {
            let foundUsers = this._users.find((user) => user.username === username);
            if (foundUsers !== null) {
                foundUsers.socketIds.add(socket.id);
            }
            else {
                this._users.push({username: username, socketIds: new Set([socket.id])});
            }

            console.log(`${username} logged in`);
        });

        socket.on('disconnect', () => {
            let user = this._users.findIndex((user) => user.socketIds.has(socket.id));
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
