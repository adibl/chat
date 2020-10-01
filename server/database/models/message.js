
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    text: {type: 'string',required: true},
    sender: {type: 'string',required: true}
}, { timestamps: { createdAt: 'created_at' } });

schema.index({"created_at": 1});

const Message = mongoose.model('Messages', schema);

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = Message;