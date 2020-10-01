const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    convId: {type: 'ObjectId', required: true, index: true},
    username: {type: 'string',required: true, index: true},
});

const ConvToUser = mongoose.model('convToUser', schema);

module.exports = ConvToUser;