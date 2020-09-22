const basicDataRequests = require("./basicDataRequests");

class usersRequests extends basicDataRequests{
    async add(user) {
        return this._data.set(user.name, user) ? user : null;
    }
}

let data = new usersRequests();
module.exports = data;