const BasicDataRequests = require("./basicData");

class ConversationRequests extends BasicDataRequests {
    async add(chat) {
        this._data.set(chat.id, chat);
    }
}

module.exports = ConversationRequests;