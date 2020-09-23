const BasicDataRequests = require("./basicDataRequests");

class ConversationRequests extends BasicDataRequests {
    async add(chat) {
        this._data.set(chat.id, chat);
    }
}

let data = new ConversationRequests();
module.exports = data;