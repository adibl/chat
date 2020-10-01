const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    convId: {type: 'ObjectId', required: true},
    messageId: {type: 'ObjectId',required: true},
});

const Conversation = mongoose.model('convToMessage', schema);

module.exports = Conversation;