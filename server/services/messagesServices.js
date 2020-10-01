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
        let users = await this._conversationToUsers.find({convId: conversationId}, 'username -_id').lean();
        users = users.map(obj => obj.username);
        if (users) {
            message.conversationId = conversationId;
            await this._webSocketHandler.sendMessage(users, message);
        }
        else {
            throw new TypeError('group dont have participants');
        }

        return message;
    }

    async getMessages(conversationId, index, limit) {

        let messages = await this._convToMessageModel.find({convId: conversationId}).sort('created_at').skip(index).limit(limit);
        let messagesIds = messages.map(obj => obj.messageId);
        return await this._messages.find().where('_id').in(messagesIds).lean();
    }

}


module.exports = messagesServices;
