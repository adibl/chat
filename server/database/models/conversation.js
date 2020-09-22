let uuid = require('uuid');

class conversation {
    constructor(name, creator, type) {
        this.id = uuid.v4();
        this.name = name;
        this.type = type;
        this.creator = creator;
    }
}

module.exports = conversation;