class messagesServices {
    constructor(conversationToMessages, Message, conversationToUsers, webSocketHandler) {
        this._conversationToMessages = conversationToMessages;
        this._messages = Message;
        this._conversationToUsers = conversationToUsers;
        this._webSocketHandler = webSocketHandler;
    }

    async sendMessageToGroup(messageJson, conversationId) {
        if (!messageJson) {
            throw new TypeError("message must have text and sender");
        }

        let message = await new this._messages(messageJson);
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

        return message.toJSON();
    }
}


module.exports = messagesServices;
