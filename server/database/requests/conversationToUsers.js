class conversationToUsers {
    constructor() {
        this._convToUsers = new map();
        this._usersToConv = new map();
    }

    getByConversationId(id) {
        return this._convToUsers.get(id);
    }

    getByUsername(name) {
        return this._usersToConv.get(name);
    }

    add(conversationId, username) {
        this._usersToConv.set(username, (this._usersToConv.get(username) ?? []).push(conversationId));
        this._convToUsers.push(conversationId, (this._convToUsers.get(conversationId) ?? []).push(username));
    }

    hasUser(name) {
        return this._usersToConv.has(name);
    }

    hasConversation(id) {
        return this._convToUsers.has(id);
    }

    removeByConversationId(id) {
        let userNames = this._convToUsers.get(id);
        if (!userNames) {
            return false;
        }

        for(let name of userNames) {
            this._usersToConv.set(name, this._usersToConv.get(name).remove(id));
        }

        return this._convToUsers.remove(id);
    }

    clear() {
        this._convToUsers.clear();
        this._usersToConv.clear();
    }

}

let data = new conversationToUsers();
module.exports = data;