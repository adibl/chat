const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    convId: {type: 'ObjectId', required: true},
    messageId: {type: 'ObjectId',required: true},
});

const ConvToMessage = mongoose.model('convToMessage', schema);

module.exports = ConvToMessage;