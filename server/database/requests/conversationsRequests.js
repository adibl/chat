const basicDataRequests = require("./basicDataRequests");

class conversationRequests extends basicDataRequests{
     async add(chat) {
        return this._data.set(chat.id, chat) ? chat : null;
    }
}

let data = new conversationRequests();
module.exports = data;