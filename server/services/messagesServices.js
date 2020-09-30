class messagesServices {
    constructor(conversationToMessages, messagesRequests, conversationToUsers, webSocketHandler) {
        this._conversationToMessages = conversationToMessages;
        this._messages = messagesRequests;
        this._conversationToUsers = conversationToUsers;
        this._webSocketHandler = webSocketHandler;
    }

    async sendMessageToGroup(message, conversationId) {
        if (!message) {
            throw new TypeError("message must have text and sender");
        }

        await message.save();
        await this._conversationToMessages.add(conversationId, message);
        let users = await this._conversationToUsers.getByConversationId(conversationId);
        if (users) {
            message.conversationId = conversationId;
            await this._webSocketHandler.sendMessage(users, message);
        }
        else {
            throw new TypeError('group dont have participants');
        }

        return message;
    }
}


module.exports = messagesServices;
