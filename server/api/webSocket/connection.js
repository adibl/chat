class SocketConnections {
    constructor(usersToSocketIds) {
        this._usersToSocketIds = usersToSocketIds;
    }

    addUser(socket) {
        socket.on('login', async (username) => {
            await this._usersToSocketIds.add(username,socket.id);
            console.log(`${username} logged in`);
        });

        socket.on('disconnect', async () => {
            await this._usersToSocketIds.removeSocket(socket.id);
            console.log(`user ${user.username} logged out`);
        });
    }

}

module.exports = SocketConnections;
