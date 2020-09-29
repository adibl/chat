let uuid = require('uuid');

class message {
    constructor(text, sender) {
        this.id = uuid.v4();
        this.text = text;
        this.sender = sender;
    }
}

function getMessageFromJson(json) {
    if (json.sender && json.text) {
        return new message(json.text, json.sender);
    }
    else {
        throw new TypeError("message object is invalid");
    }
}

module.exports = {message, getMessageFromJson};