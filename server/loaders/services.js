let chatsData = require("../database/requests/conversationsRequests");
let conversationToUsers = require("../database/requests/conversationToUsers");
let conversationToMessages = require("../database/requests/conversationToMessages");
let messagesRequests = require("../database/requests/messagesRequests");
let {getMessageFromJson} = require("../database/models/message");
let {getConversationFromJson} = require("../database/models/conversation");
let usersManager = require("../database/requests/usersReqeusts");
let User = require("../database/models/user");

let userServicesFactory = require("../services/userServices");
let conversationServicesFactory = require("../services/conversationServices");
let messageServicesFactory = require("../services/messagesServices");

function load(webSocketHandler) {
    let userServices = new userServicesFactory(usersManager, User, conversationToUsers);
    let conversationServices = new conversationServicesFactory(chatsData, userServices, conversationToUsers,
        conversationToMessages, getConversationFromJson, webSocketHandler);
    let messageServices = new messageServicesFactory(conversationToMessages, messagesRequests,
        getMessageFromJson, conversationToUsers, webSocketHandler);
    return {userServices, conversationServices, messageServices}
}


module.exports = load;

