const generateId = require("../../services/IdService");

class Conversation {
    constructor(creator, type, name) {
        this.id = generateId();
        this.name = name;
        this.type = type;
        this.creator = creator;
    }
}

module.exports = Conversation;