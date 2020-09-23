class messagesServices {
    constructor(conversationToMessages, messagesRequests, getMessageFromJson, conversationToUsers, webSocketHandler) {
        this._conversationToMessages = conversationToMessages;
        this._messagesRequests = messagesRequests;
        this._getMessageFromJson = getMessageFromJson;
        this._conversationToUsers = conversationToUsers;
        this._webSocketHandler = webSocketHandler;
    }

    async sendMessageToGroup(messageJson, conversationId) {
        let message = this._getMessageFromJson(messageJson);

        if (!message) {
            throw new RangeError("message must have text and sender");
        }
        await this._messagesRequests.add(message);
        await this._conversationToMessages.add(conversationId, message);
        let users = await this._conversationToUsers.getByConversationId(conversationId);
        await this._webSocketHandler.getInstance().sendMessage(conversationId, users, message);
        return message;
    }
}


module.exports = messagesServices;
