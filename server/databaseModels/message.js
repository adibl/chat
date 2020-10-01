const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const schema = new mongoose.Schema({
    text: {type: 'string', required: true},
    sender: {type: 'string', required: true}
});

schema.plugin(autoIncrement.plugin, 'Message');

const Message = mongoose.model('Messages', schema);

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = Message;