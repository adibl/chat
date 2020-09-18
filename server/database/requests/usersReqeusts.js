class usersData {
    constructor(){
        if(usersData.exists){
            return usersData.Instance
        }
        this._data = new Map();
        usersData.Instance = this;
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


module.exports = usersData;