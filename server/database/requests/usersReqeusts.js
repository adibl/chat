class usersRequests {
    constructor(){
        if(usersRequests.exists){
            return usersRequests.Instance
        }
        this._data = new Map();
        usersRequests.Instance = this;
        }

    get(name) {
        return this._data.get(name)
    }

    add(user) {
        return this._data.set(user.name, user) ? user : null;
    }

    has(name) {
        return this._data.has(name)
    }

    remove(name) {
        return this._data.delete(name);
    }

    clear() {
        this._data.clear();
    }

}

let data = new usersRequests();
module.exports = data;