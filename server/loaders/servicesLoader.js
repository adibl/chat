let {getMessageFromJson} = require("../database/models/message");
let {getConversationFromJson} = require("../database/models/conversation");
let User = require("../database/models/user");

let userServicesFactory = require("../services/userServices");
let conversationServicesFactory = require("../services/conversationServices");
let messageServicesFactory = require("../services/messagesServices");

function load(database, webSocketHandler) {
    let userServices = new userServicesFactory(database.usersRequests, User, database.conversationToUsersRequests);
    let conversationServices = new conversationServicesFactory(database.conversationRequests, userServices, database.conversationToUsersRequests,
        database.conversationToMessagesRequests, getConversationFromJson, webSocketHandler);
    let messageServices = new messageServicesFactory(database.conversationToMessagesRequests, database.messagesRequests,
        getMessageFromJson, database.conversationToUsersRequests, webSocketHandler);
    return {userServices, conversationServices, messageServices}
}


module.exports = load;

