
class userServices {
    constructor(usersManager, User, conversationToUsers) {
        this._usersManager = usersManager;
        this._user = User;
        this._conversationToUsers = conversationToUsers;
    }

        async createUser(name) {
            if (await this._usersManager.has(name)) {
                return null;
            } else {
                let newUser = new this._user(name);
                await this._usersManager.add(newUser);
                return newUser;
            }
        }

        async getUser(name) {
            return this._usersManager.get(name);
        }

        async getUsernamesSorted(index, limit) {
            return this._usersManager.getUsernamesSorted(index, limit);
        }

        async getUserConversations(name) {
            return await this._conversationToUsers.getByUsername(name);
        }

        async hasUser(name) {
            return this._usersManager.has(name);
        }

        async remove(name) {
            return this._usersManager.remove(name);
        }

        async clear() {
            return this._usersManager.clear();
        }
}

module.exports = userServices;
