class conversationToUsers {
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
        for(let user of usernames) {
            this._usersToConv.set(user, (this._usersToConv.get(user) || []).push(conversationId));
        }

        if (this._convToUsers.has(conversationId)) {
            return this._convToUsers.set(conversationId, this._convToUsers.get(conversationId).concat(usernames));
        }

        return this._convToUsers.set(conversationId, usernames);
    }

    async hasUser(name) {
        return this._usersToConv.has(name);
    }

    async hasConversation(id) {
        return this._convToUsers.has(id);
    }

    async removeByConversationId(id) {
        let userNames = this._convToUsers.get(id);
        if (!userNames) {
            return false;
        }

        for(let name of userNames) {
            this._usersToConv.set(name, this._usersToConv.get(name).remove(id));
        }

        return this._convToUsers.remove(id);
    }

    async clear() {
        this._convToUsers.clear();
        this._usersToConv.clear();
    }

}

let data = new conversationToUsers();
module.exports = data;