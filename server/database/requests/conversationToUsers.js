class ConversationToUsers {
    constructor() {
        this._convToUsers = new Map();
        this._usersToConv = new Map();
    }

    async getByConversationId(id) {
        return this._convToUsers.get(id);
    }

    async getByUsername(name) {
        return this._usersToConv.get(name);
    }

    async add(conversationId, usernames) {
        for (let user of usernames) {
            if (this._usersToConv.get(user)) {
                this._usersToConv.get(user).push(conversationId);
            } else {
                this._usersToConv.set(user, [conversationId]);
            }

        }

        if (this._convToUsers.has(conversationId)) {
            return this._convToUsers.set(conversationId, this._convToUsers.get(conversationId).concat(usernames));
        }

        return this._convToUsers.set(conversationId, usernames);
    }

    async clear() {
        this._convToUsers.clear();
        this._usersToConv.clear();
    }

}

let data = new ConversationToUsers();
module.exports = data;