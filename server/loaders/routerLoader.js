let usersRouter = require("../api/routers/usersRouter");
let conversationRouter = require("../api/routers/conversationsRouter");
let messagesRouter = require("../api/routers/messagesRouter");
let express = require("express");
let cors = require('cors');
let logger = require('./loggerLoader');

module.exports = (app, userServices, messageServices, conversationServices) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use((req, res, next) => {
        let url = req.url;
        res.on('finish', () => {
            logger.info(`${req.method} ${url} - ${res.statusCode}`);
        });
        next();


    });


    app.use('/users', usersRouter(userServices));
    app.use('/conversations', conversationRouter(conversationServices));
    app.use('/messages', messagesRouter(messageServices));
    app.use((err, req, res, next) => {
        logger.warn(`${err.status} ${err.message}`);
        next(err);
    });

};