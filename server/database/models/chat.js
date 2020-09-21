let uuid = require('uuid');

class Chat {
    constructor(name, creator, members) {
        this.id = new uuid.v4();
        this.name = name;
        this.members = members;
        this.creator = creator;
    }
}

module.exports = Chat;