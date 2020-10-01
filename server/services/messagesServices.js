class messagesServices {
    constructor(convToMessageModel, Message, conversationToUsers, webSocketHandler) {
        this._convToMessageModel = convToMessageModel;
        this._messages = Message;
        this._conversationToUsers = conversationToUsers;
        this._webSocketHandler = webSocketHandler;
    }

    async sendMessageToGroup(messageJson, conversationId) {
        if (!messageJson) {
            throw new TypeError("message must have text and sender");
        }

        let Mongoosemessage = await new this._messages(messageJson);
        await Mongoosemessage.save();
        let message = Mongoosemessage.toJSON();
        let convToMessage = await new this._convToMessageModel({convId: conversationId, messageId: Mongoosemessage.id});
        await convToMessage.save();
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
