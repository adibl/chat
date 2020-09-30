let User = require("../database/models/user");

let userServicesClass = require("../services/userServices");
let conversationServicesClass = require("../services/conversationServices");
let messageServicesClass = require("../services/messagesServices");
let Messages = require('../database/models/message');

function load(database, webSocketHandler) {
    let userServices = new userServicesClass(User, database.conversationToUsersRequests);
    let conversationServices = new conversationServicesClass(database.conversationRequests, userServices, database.conversationToUsersRequests,
        database.conversationToMessagesRequests, webSocketHandler);
    let messageServices = new messageServicesClass(database.conversationToMessagesRequests, Messages,
        database.conversationToUsersRequests, webSocketHandler);
    return {userServices, conversationServices, messageServices}
}


module.exports = load;

