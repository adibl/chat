const basicDataRequests = require("./basicDataRequests");

class conversationRequests extends basicDataRequests{
     async add(chat) {
        this._data.set(chat.id, chat);
    }
}

let data = new conversationRequests();
module.exports = data;