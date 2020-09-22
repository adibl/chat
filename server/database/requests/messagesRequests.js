const basicDataRequests = require("./basicDataRequests");

class messageRequests extends basicDataRequests{

    async add(message) {
        this._data.set(message.id, message);
    }

}

let data = new messageRequests();
module.exports = data;