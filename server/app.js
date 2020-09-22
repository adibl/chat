let express = require('express');
let usersRouter =  require('./api/routers/usersRouter');
let chatsRouter =  require('./api/routers/conversationsRouter');
let bodyParser = require('body-parser');
let morgan = require('morgan');


let app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/users',usersRouter);
app.use('/conversations',chatsRouter);



app.listen(8080);
console.log("listening on port 8080");

module.exports = app; //for testing