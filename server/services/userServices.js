
class userServices {
    constructor(usersManager, User, conversationToUsers) {
        this._usersManager = usersManager;
        this._user = User;
        this._conversationToUsers = conversationToUsers;
    }

        async createOrGetUser(name) {
            if (await this._usersManager.has(name)) {
                return this._usersManager.get(name);
            } else {
                let newUser = new this._user(name);
                await this._usersManager.add(newUser);
                return newUser;
            }
        }

        async getUser(name) {
            return await this._usersManager.get(name);
        }

        async getUsernamesSorted(index, limit) {
            return await this._usersManager.getUsernamesSorted(index, limit);
        }

        async getUserConversations(name) {
            return await this._conversationToUsers.getByUsername(name);
        }

        async hasUser(name) {
            return await this._usersManager.has(name);
        }

        async remove(name) {
            return await this._usersManager.remove(name);
        }

        async clear() {
            return await this._usersManager.clear();
        }
}

module.exports = userServices;
