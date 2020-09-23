const BasicDataRequests = require("./basicDataRequests");

class MessageRequests extends BasicDataRequests {

    async add(message) {
        this._data.set(message.id, message);
    }

}

let data = new MessageRequests();
module.exports = data;