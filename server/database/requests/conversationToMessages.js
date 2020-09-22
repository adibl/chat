class conversationToMessages {
    constructor(){
        this._data = new Map();
    }

    get(id) {
        return this._data.get(id);
    }

    add(conversationId, message = null) {
        if (message) {
            this._data.set(conversationId, (this._data.get(conversationId) || []).push(message));
        }
        else {
            this._data.set(conversationId, []);
        }

    }

    has(id) {
        return this._data.has(id);
    }

    remove(id) {
        return this._data.delete(id);
    }

    clear() {
        this._data.clear();
    }

}

let data = new conversationToMessages();
module.exports = data;