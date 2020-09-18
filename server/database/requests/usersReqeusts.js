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
        return this._data.add(user.name, user)
    }

    has(name) {
        return this._data.has(name)
    }

}

const instance = new usersData();
Object.freeze(instance);

export default instance;