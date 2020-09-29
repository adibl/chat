
class userServices {
    constructor(usersManager, User, conversationToUsers) {
        this._usersManager = usersManager;
        this._user = User;
        this._conversationToUsers = conversationToUsers;
    }

        async createOrGetUser(user) {
            if (await this._usersManager.has(user.name)) {
                return this._usersManager.get(user.name);
            } else {
                await this._usersManager.add(user);
                return user;
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
