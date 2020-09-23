let express = require('express');
let usersRouter =  require('./api/routers/usersRouter');
let chatsRouter =  require('./api/routers/conversationsRouter');
let messagesRouter =  require('./api/routers/messagesRouter');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let webSocketHandler = require('./api/webSocket');
const http = require("http");
const {message} = require("./database/models/message");

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const io = require('socket.io')(server);


webSocketHandler.getInstance(io);

app.use(express.json());
app.use(morgan('dev'));
app.use('/users',usersRouter);
app.use('/conversations',chatsRouter);
app.use('/messages', messagesRouter);



server.listen(8080);
console.log("listening on port 8080");

module.exports = app; //for testing