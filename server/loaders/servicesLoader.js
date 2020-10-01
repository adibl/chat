let User = require("../databaseModels/user");

let userServicesClass = require("../services/userServices");
let conversationServicesClass = require("../services/conversationServices");
let messageServicesClass = require("../services/messagesServices");
let Messages = require('../databaseModels/message');
let Conversaion =require('../databaseModels/conversation');
let ConvToMessage = require('../databaseModels/converdationToMessages');
let ConvToUser = require('../databaseModels/convToUser');


function load(database, webSocketHandler) {
    let userServices = new userServicesClass(User, ConvToUser);
    let conversationServices = new conversationServicesClass(Conversaion, userServices, ConvToUser,
        webSocketHandler);
    let messageServices = new messageServicesClass(ConvToMessage, Messages,
        ConvToUser, webSocketHandler);
    return {userServices, conversationServices, messageServices}
}


module.exports = load;

