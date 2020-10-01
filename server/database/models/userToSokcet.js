const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {type: 'string', required: true, index: true},
    socketId: {type: 'string', required: true, index: true},
});

const UserToSocket = mongoose.model('userToSockets', schema);

module.exports = UserToSocket;