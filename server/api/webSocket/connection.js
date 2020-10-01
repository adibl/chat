class SocketConnections {
    constructor(usersToSocketIds, logger) {
        this._usersToSocketIds = usersToSocketIds;
        this._logger = logger;
    }

    addUser(socket) {
        socket.on('login', async (username) => {
            await this._usersToSocketIds.create({username: username, socketId: socket.id});

            this._logger.info(`${username} logged in`);
        });

        socket.on('disconnect', async () => {
            let username = await this._usersToSocketIds.findOneAndDelete({socketId: socket.id});
            this._logger.info(`user ${username.username} logged out`);
        });
    }

}

module.exports = SocketConnections;
