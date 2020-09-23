let usersRouter = require("../api/routers/usersRouter");
let conversationRouter = require("../api/routers/conversationsRouter");
let messagesRouter = require("../api/routers/messagesRouter");
const morgan = require("morgan");
const bodyParser = require("body-parser");


module.exports = (app, userServices, messageServices, conversationServices) => {
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    app.use('/users', usersRouter(userServices));
    app.use('/conversations', conversationRouter(conversationServices));
    app.use('/messages', messagesRouter(messageServices));
}