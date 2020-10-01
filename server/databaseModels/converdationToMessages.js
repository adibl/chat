const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    convId: {type: 'ObjectId', required: true, index: true},
    messageId: {type: 'number', required: true, index: true},
});

const ConvToMessage = mongoose.model('convToMessage', schema);

module.exports = ConvToMessage;