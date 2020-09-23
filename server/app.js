let express = require('express');
let morgan = require('morgan');
let webSocketHandler = require('./api/webSocketInitializer');
const http = require("http");

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);


webSocketHandler.getInstance(io);

app.use(express.json());
app.use(morgan('dev'));
let routers = require('./loaders/routerLoader');
let services = require('./loaders/services');
let {userServices, conversationServices, messageServices} = services;
routers(app, userServices, messageServices, conversationServices);


server.listen(8080);
console.log("listening on port 8080");

module.exports = app;