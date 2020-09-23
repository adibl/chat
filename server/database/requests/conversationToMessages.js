class ConversationToMessages {
    constructor() {
        this._data = new Map();
    }

    async get(id) {
        return this._data.get(id);
    }

    async add(conversationId, message = null) {
        if (message) {
            this._data.set(conversationId, (this._data.get(conversationId) || []).push(message));
        }
        else {
            this._data.set(conversationId, []);
        }

    }

    async has(id) {
        return this._data.has(id);
    }

    async remove(id) {
        return this._data.delete(id);
    }

    async clear() {
        this._data.clear();
    }

}

let data = new ConversationToMessages();
module.exports = data;