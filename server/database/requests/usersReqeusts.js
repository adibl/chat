const basicDataRequests = require("./basicDataRequests");

class usersRequests extends basicDataRequests{
    async add(user) {
        this._data.set(user.name, user);
    }
}

let data = new usersRequests();
module.exports = data;