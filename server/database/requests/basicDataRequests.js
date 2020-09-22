class basicDataRequests {
    constructor(){
        this._data = new Map();
    }

    get(key) {
        return this._data.get(key)
    }

    has(key) {
        return this._data.has(key)
    }

    remove(key) {
        return this._data.delete(key);
    }

    clear() {
        this._data.clear();
    }

}

module.exports = basicDataRequests;