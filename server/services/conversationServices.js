class conversationServices {
    constructor(conversationModel, userServices, conversationToUsers, webSocketHandler) {
        this._conversationModel = conversationModel;
        this._userServices = userServices;
        this._conversationToUsers = conversationToUsers;
        this._webSocketHandler = webSocketHandler;
    }

    async _testUsersExist(usernames) {
        for (let user of usernames) {
            if (!await this._userServices.hasUser(user)) {
                throw new TypeError(`user ${user} dont exist`);
            }
        }
    }

    async createConversation(conversationJson, members) {
        if (!members || !conversationJson) {
            throw new RangeError('conversation or members dont exist');
        }
        await this._testUsersExist([...members, conversationJson.creator]);

        let mongooseConv = await new this._conversationModel(conversationJson);
        mongooseConv.save();
        let conversation = mongooseConv.toJSON();
        for(let user of [...members, conversation.creator]) {
            await this._conversationToUsers.create({convId: conversation.id, username:user});
        }

        await this._webSocketHandler.sendMessage([...members, conversation.creator], conversation.id.toString(), "newGroup");

        return conversation;
    }

    async getConversation(id) {
        let conversation = await this._conversationModel.findById(id).lean();
        if (conversation) {
            conversation.members = await this._conversationToUsers.find({convId: id}, 'username -_id').lean();
            conversation.members = conversation.members.map(obj => obj.username);
            return conversation;
        }
        else {
            throw new RangeError(`conversation  with id:${id} dont exist`);
        }
    }

    async clear() {
        await this._conversationModel.deleteMany({});
        await this._conversationToUsers.deleteMany({});
    }
}

module.exports = conversationServices;
