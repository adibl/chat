class ConversationToUsers {
    constructor() {
        this._convToUsers = [];
    }

    async getByConversationId(id) {
        return this._convToUsers.filter((obj) => obj.convId === id).map((obj) => obj.userId);
    }

    async getByUsername(name) {
        return this._convToUsers.filter((obj) => obj.userId === name).map((obj) => obj.convId);
    }

    async add(conversationId, usernames) {
        for(let username of usernames) {
            this._convToUsers.push({userId: username, convId: conversationId});
        }
    }

    async clear() {
        this._convToUsers = [];
    }

}

module.exports = ConversationToUsers;