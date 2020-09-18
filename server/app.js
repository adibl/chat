const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connect', socket => {
    console.log("New client connected");
    // either with send()
    socket.emit('message','Hello!');

    // handle the event sent with socket.send()
    socket.on('message', (data) => {
        console.log(data);
    });
});

server.listen(8080);