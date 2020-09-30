let ConversationRequests = require('../database/requests/conversations');
let ConversationToMessagesRequests = require('../database/requests/conversationToMessages');
let ConversationToUsersRequests = require('../database/requests/conversationToUsers');
let UsernameToSocketIdsRequests = require('../database/requests/usernameToSocketIds');
const logger = require("../loaders/loggerLoader");

class DatabaseLoader {
    constructor() {
        this.loaded = null;
    }

    load() {
        if (!this.loaded) {
            const mongoose = require('mongoose');
            let conn = mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    logger.info("Connected to the database!");
                })
                .catch(err => {
                    logger.error("Cannot connect to the database!", err);
                    process.exit();
                });
            let conversationRequests = new ConversationRequests();
            let conversationToMessagesRequests = new ConversationToMessagesRequests();
            let conversationToUsersRequests = new ConversationToUsersRequests();
            let usernameToSocketIds = new UsernameToSocketIdsRequests();
            this.loaded = {conversationRequests, conversationToMessagesRequests, conversationToUsersRequests,
                usernameToSocketIds};
        }

        return this.loaded;
    }
}

let databaseLoader = new DatabaseLoader();
module.exports = databaseLoader;

