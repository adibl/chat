let webSocketInitializer = require("../services/webSocketServices");
let webSocketConnectionHandler = require("../api/webSocket/connection");

function load(server, database) {
    const io = require('socket.io')(server);
    new webSocketConnectionHandler(database.usernameToSocketIds);
    return new webSocketInitializer(io, database.usernameToSocketIds);
}

module.exports = load;