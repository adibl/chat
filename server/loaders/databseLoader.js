let ConversationRequests = require('../database/requests/conversations');
let ConversationToMessagesRequests = require('../database/requests/conversationToMessages');
let ConversationToUsersRequests = require('../database/requests/conversationToUsers');
let MessagesRequests = require('../database/requests/messages');
let UsersRequests = require('../database/requests/users');
let UsernameToSocketIdsRequests = require('../database/requests/usernameToSocketIds');

class DatabaseLoader {
    constructor() {
        this.loaded = null;
    }

    load() {
        if (!this.loaded) {
            let conversationRequests = new ConversationRequests();
            let conversationToMessagesRequests = new ConversationToMessagesRequests();
            let conversationToUsersRequests = new ConversationToUsersRequests();
            let messagesRequests = new MessagesRequests();
            let usersRequests = new UsersRequests();
            let usernameToSocketIds = new UsernameToSocketIdsRequests();
            this.loaded = {conversationRequests, conversationToMessagesRequests, conversationToUsersRequests,
                messagesRequests, usersRequests, usernameToSocketIds};
        }

        return this.loaded;
    }
}

let databaseLoader = new DatabaseLoader();
module.exports = databaseLoader;

