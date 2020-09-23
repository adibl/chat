let uuid = require('uuid');

class Conversation {
    constructor(name, creator, type) {
        this.id = uuid.v4();
        this.name = name;
        this.type = type;
        this.creator = creator;
    }
}

function getConversationFromJson(json) {
    if (json.name && json.type && json.creator) {
        return new Conversation(json.name, json.creator, json.type);
    }
}

module.exports = {Conversation, getConversationFromJson};