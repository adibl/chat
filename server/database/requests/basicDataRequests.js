class basicDataRequests {
    constructor(){
        this._data = new Map();
    }

    async get(key) {
        return this._data.get(key)
    }

    async has(key) {
        return this._data.has(key)
    }

    async remove(key) {
        return this._data.delete(key);
    }

    async clear() {
        this._data.clear();
    }

}

module.exports = basicDataRequests;