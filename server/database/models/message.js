let uuid = require('uuid');

class Message {
    constructor(text, sender) {
        this.id = uuid.v4();
        this.text = text;
        this.sender = sender;
    }
}


module.exports = Message;