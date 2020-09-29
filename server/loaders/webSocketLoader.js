let webSocketInitializer = require("../services/webSocketServices");
let webSocketConnectionHandler = require("../api/webSocket/connection");
const logger = require("../loaders/loggerLoader");


function load(server, database) {
    const io = require('socket.io')(server);
    let socketConnections = new webSocketConnectionHandler(database.usernameToSocketIds, logger);
    return new webSocketInitializer(io, socketConnections, database.usernameToSocketIds, logger);
}

module.exports = load;