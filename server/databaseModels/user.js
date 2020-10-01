const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {type: 'string', index: {unique: true}, required: true}
});

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const User = mongoose.model('User', schema);

module.exports = User;