class conversationServices {
    constructor(conversationRequests, userServices, conversationToUsers, conversationToMessages, getMessageFromJson, webSocketHandler) {
        this._conversationRequests = conversationRequests;
        this._userServices = userServices;
        this._conversationToUsers = conversationToUsers;
        this._conversationToMessages = conversationToMessages;
        this._getMessageFromJson = getMessageFromJson;
        this._webSocketHandler = webSocketHandler;
    }

    async _testUsersExist(usernames) {
        for (let user of usernames) {
            if (!await this._userServices.hasUser(user)) {
                throw new RangeError(`user ${user} dont exist`);
            }
        }
    }

    async createConversation(conversationJson, members) {
        let conversation = this._getMessageFromJson(conversationJson);
        if (!conversation) {
            throw new TypeError("conversation object is invalid");
        }

        await this._testUsersExist([...members, conversation.creator]);

        await this._conversationRequests.add(conversation);
        await this._conversationToUsers.add(conversation.id, [...members, conversation.creator]);
        await this._conversationToMessages.create(conversation.id);
        await this._webSocketHandler.sendMessage([...members, conversation.creator], conversation.id, "newGroup");

        return conversation;
    }

    async getConversation(id) {
        let conversation = await this._conversationRequests.get(id);
        if (conversation) {
            conversation.members = await this._conversationToUsers.getByConversationId(id);
        }

        return conversation;
    }

    async clear() {
        await this._conversationRequests.clear();
        await this._conversationToUsers.clear();
        return this._conversationToMessages.clear();
    }
}


module.exports = conversationServices;
