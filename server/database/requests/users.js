const BasicDataRequests = require("./basicData");

class UsersRequests extends BasicDataRequests {
    async add(user) {
        this._data.set(user.name, user);
    }

    async getUsernamesSorted(index, limit) {
        return [...this._data.keys()].sort().slice(index, index + limit);
    }
}

module.exports = UsersRequests;