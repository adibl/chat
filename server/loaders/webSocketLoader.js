let webSocketInitializer = require("../services/webSocketServices");
let webSocketConnectionHandler = require("../api/webSocket/connection");
let UsernameToSockets = require('../databaseModels/userToSokcet');
const logger = require("../loaders/loggerLoader");


function load(server, database) {
    const io = require('socket.io')(server);
    let socketConnections = new webSocketConnectionHandler(UsernameToSockets, logger);
    return new webSocketInitializer(io, socketConnections, UsernameToSockets, logger);
}

module.exports = load;