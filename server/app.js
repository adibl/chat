let express = require('express');
const http = require("http");
let routersLoader = require('./loaders/routerLoader');
let servicesLoader = require('./loaders/servicesLoader');
let webSocketLoader = require("./loaders/webSocketLoader");
let databaseLoader = require('./loaders/databseLoader');
const logger = require("./loaders/loggerLoader");

const app = express();
const server = http.createServer(app);

let database = databaseLoader.load();
let webSocket = webSocketLoader(server, database);
let {userServices, conversationServices, messageServices} = servicesLoader(database, webSocket);
routersLoader(app, userServices, messageServices, conversationServices);

server.listen(8080, '0.0.0.0');
logger.info("listening on port 8080");

module.exports = server;