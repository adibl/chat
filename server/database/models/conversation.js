let uuid = require('uuid');

class Conversation {
    constructor(creator, type, name) {
        this.id = uuid.v4();
        this.name = name;
        this.type = type;
        this.creator = creator;
    }
}

module.exports = Conversation;