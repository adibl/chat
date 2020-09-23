module.exports = (app, userServices, messageServices, conversationServices) => {
    let usersRouter = require("../api/routers/usersRouter");
    let conversationRouter = require("../api/routers/conversationsRouter");
    let messagesRouter = require("../api/routers/messagesRouter");

    app.use('/users', usersRouter(userServices));
    app.use('/conversations', conversationRouter(conversationServices));
    app.use('/messages', messagesRouter(messageServices));
}