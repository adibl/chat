class User{
    constructor(userName) {
        this.name = userName;
        this.chats = new Map();
    }
}

module.exports = User;