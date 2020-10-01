const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: 'string'},
    type: {type: 'string',required: true, enum: ['group', 'personal']},
    creator: {type: 'string',required: true}
});

const Conversation = mongoose.model('Conversations', schema);

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = Conversation;