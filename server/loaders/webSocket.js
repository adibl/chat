let webSocketInitializer = require("../api/webSocketInitializer");
let webSocketConnectionHandler = require("../api/webSocket/connection");

function load(server) {
    const io = require('socket.io')(server);
    return new webSocketInitializer(io, new webSocketConnectionHandler());
}

module.exports = load;