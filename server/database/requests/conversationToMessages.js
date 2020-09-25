let BasicDataRequests = require('./basicData');

class ConversationToMessages extends BasicDataRequests {

    async add(conversationId, message) {
        let messages = this._data.get(conversationId);
        if (messages) {
            messages.push(message);
        }
        else {
            this._data.set(conversationId, [message]);
        }

    }

    async create(conversationId) {
        this._data.set(conversationId, []);
    }

}

module.exports = ConversationToMessages;