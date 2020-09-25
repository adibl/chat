let ConversationRequests = require('../database/requests/conversations');
let ConversationToMessagesRequests = require('../database/requests/conversationToMessages');
let ConversationToUsersRequests = require('../database/requests/conversationToUsers');
let MessagesRequests = require('../database/requests/messages');
let UsersRequests = require('../database/requests/users');

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
            this.loaded = {conversationRequests, conversationToMessagesRequests, conversationToUsersRequests, messagesRequests, usersRequests};
        }

        return this.loaded;
    }
}

let databaseLoader = new DatabaseLoader();
module.exports = databaseLoader;

