class conversationServices {
    constructor(chatsData, userServices, conversationToUsers, conversationToMessages) {
        this._chatsData = chatsData;
        this._userServices = userServices;
        this._conversationToUsers = conversationToUsers;
        this._conversationToMessages = conversationToMessages;
    }

    async _testUsersExist(usernames) {
        for (let user of usernames) {
            if (!await this._userServices.hasUser(user)) {
                throw new RangeError(`user ${user} dont exist`);
            }
        }
    }

    async createConversation(conversation, members) {
        await this._testUsersExist([...members, conversation.creator]);

        await this._chatsData.add(conversation);
        await this._conversationToUsers.add(conversation.id, [...members, conversation.creator]);
        await this._conversationToMessages.add(conversation.id);

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
