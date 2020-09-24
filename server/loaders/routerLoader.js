let usersRouter = require("../api/routers/usersRouter");
let conversationRouter = require("../api/routers/conversationsRouter");
let messagesRouter = require("../api/routers/messagesRouter");
const morgan = require("morgan");
const express = require("express");


module.exports = (app, userServices, messageServices, conversationServices) => {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(morgan('dev'));

    app.use('/users', usersRouter(userServices));
    app.use('/conversations', conversationRouter(conversationServices));
    app.use('/messages', messagesRouter(messageServices));
};