let express = require('express');
const http = require("http");
let routersLoader = require('./loaders/routerLoader');
let servicesLoader = require('./loaders/servicesLoader');
let webSocketLoader = require("./loaders/webSocketLoader");
let databaseLoader = require('./loaders/databseLoader');

const app = express();
const server = http.createServer(app);

let webSocket =  webSocketLoader(server);
let {userServices, conversationServices, messageServices} = servicesLoader(databaseLoader.load(),webSocket);
routersLoader(app, userServices, messageServices, conversationServices);

server.listen(8080);
console.log("listening on port 8080");

module.exports = server;