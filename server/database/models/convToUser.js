const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    convId: {type: 'ObjectId', required: true},
    username: {type: 'string',required: true},
});

const ConvToUser = mongoose.model('convToUser', schema);

module.exports = ConvToUser;