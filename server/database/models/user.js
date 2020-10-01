const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {type:'string', index: { unique: true }, required: true }
});

const User = mongoose.model('User', schema);

module.exports = User;