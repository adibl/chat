class usersData {
    constructor(){
        if(! usersData.instance){
            this._data = new Map();
            usersData.instance = this;
        }

        return usersData.instance;
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

    clear() {
        this._data.clear();
    }

}

const instance = new usersData();
Object.freeze(instance);

module.exports = instance;