class chatsData {
    constructor(){
        this._data = new Map();
    }

    get(id) {
        return this._data.get(id);
    }

    add(chat) {
        return this._data.set(chat.id, chat) ? chat : null;
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

let data = new chatsData();
module.exports = data;