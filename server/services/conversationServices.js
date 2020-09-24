class conversationServices {
    getMessageFromJson;
    constructor(chatsData, userServices, conversationToUsers, conversationToMessages, getMessageFromJson, webSocketHandler) {
        this._chatsData = chatsData;
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

        await this._chatsData.add(conversation);
        await this._conversationToUsers.add(conversation.id, [...members, conversation.creator]);
        await this._conversationToMessages.create(conversation.id);
        await this._webSocketHandler.sendMessage([...members, conversation.creator], conversation.id, "newGroup");

        return conversation;
    }

    async getConversationMetadata(id) {
        return this._chatsData.get(id);
    }

    async clear() {
        await this._chatsData.clear();
        await this._conversationToUsers.clear();
        return this._conversationToMessages.clear();
    }
}


module.exports = conversationServices;
