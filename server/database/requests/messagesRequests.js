const basicDataRequests = require("./basicDataRequests");

class messageRequests extends basicDataRequests{

    async add(message) {
        return this._data.set(message.id, message) ? message : null;
    }

}

let data = new messageRequests();
module.exports = data;