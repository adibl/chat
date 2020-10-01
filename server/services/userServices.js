class userServices {
    constructor(UserModel, convToUsersModel) {
        this._userModel = UserModel;
        this._convToUsersModel = convToUsersModel;
    }

    async createOrGetUser(name) {
        let user = await this._userModel.findOne({name: name});
        if (user) {
            return user.toJSON();
        }
        else {
            let newUser = new this._userModel({name: name});
            await newUser.save();
            return newUser.toJSON();
        }
    }

    async getUser(name) {
        return await this._userModel.findOne({name: name}).lean();
    }

    async getUsernamesSorted(index, limit) {
        let users = await this._userModel.find({}, 'name', {skip: index, limit: limit}).sort('name').lean();
        return users.map(obj => obj.name);
    }

    async getUserConversations(name) {
        let conversations = await this._convToUsersModel.find({username: name}, 'convId -_id').lean();
        return conversations.map(obj => obj.convId);
    }

    async hasUser(name) {
        return this._userModel.findOne({name: name});
    }

    async remove(name) {
        return (await this._userModel.deleteOne({name: name})).deletedCount === 1;
    }
}

module.exports = userServices;
