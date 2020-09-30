
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    text: 'string',
    sender: 'string'
});

const Message = mongoose.model('Messages', schema);

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = Message;