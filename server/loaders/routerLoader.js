let usersRouter = require("../api/routers/usersRouter");
let conversationRouter = require("../api/routers/conversationsRouter");
let messagesRouter = require("../api/routers/messagesRouter");
let morgan = require("morgan");
let express = require("express");
let cors = require('cors');


module.exports = (app, userServices, messageServices, conversationServices) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(morgan('dev'));

    app.use('/users', usersRouter(userServices));
    app.use('/conversations', conversationRouter(conversationServices));
    app.use('/messages', messagesRouter(messageServices));
};