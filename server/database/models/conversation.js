let uuid = require('uuid');

class Conversation {
    constructor(creator, type, name) {
        this.id = uuid.v4();
        this.name = name;
        this.type = type;
        this.creator = creator;
    }
}

function getConversationFromJson(json) {
    if (json.type && json.creator) {
        return new Conversation(json.creator, json.type, json.name);
    }
    else {
        throw new TypeError("conversation object is invalid");
    }
}

module.exports = {Conversation, getConversationFromJson};