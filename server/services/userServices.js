
class userServices {
    constructor(UserModel, conversationToUsers) {
        this._userModel = UserModel;
        this._conversationToUsers = conversationToUsers;
    }

        async createOrGetUser(name) {
        let user = await this._userModel.find({ name: name });
            if (user.length > 0) {
                return user;
            }
            else {
                let newUser = new this._userModel({name: name});
                await newUser.save();
                return newUser;
            }
        }

        async getUser(name) {
            return await this._userModel.findOne({ name: name }).lean();
        }

        async getUsernamesSorted(index, limit) {
            let users = await this._userModel.find({}).limit(limit).skip(index).sort('name').lean();
            return users.map(obj => obj.name);
        }

        async getUserConversations(name) {
            return await this._conversationToUsers.getByUsername(name);
        }

        async hasUser(name) {
            let users = await this._userModel.find({ name: name }).lean();
            return users.length > 0;
        }

        async remove(name) {
            return (await this._userModel.deleteOne({name: name})).deletedCount === 1;
        }

        async clear() {
            return await this._userModel.deleteMany({});
        }
}

module.exports = userServices;
