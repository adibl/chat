let uuid = require('uuid');

class conversation {
    constructor(name, creator, type) {
        this.id = new uuid.v4();
        this.name = name;
        this.type = type;
        this.creator = creator;
    }
}

module.exports = conversation;