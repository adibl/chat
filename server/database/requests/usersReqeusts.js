const BasicDataRequests = require("./basicDataRequests");

class UsersRequests extends BasicDataRequests {
    async add(user) {
        this._data.set(user.name, user);
    }
}

let data = new UsersRequests();
module.exports = data;