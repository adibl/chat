let User = require("../database/models/user");

let userServicesClass = require("../services/userServices");
let conversationServicesClass = require("../services/conversationServices");
let messageServicesClass = require("../services/messagesServices");
let Messages = require('../database/models/message');
let Conversaion =require('../database/models/conversation');
let ConvToMessage = require('../database/models/converdationToMessages');
let ConvToUser = require('../database/models/convToUser');


function load(database, webSocketHandler) {
    let userServices = new userServicesClass(User, ConvToUser);
    let conversationServices = new conversationServicesClass(Conversaion, userServices, ConvToUser,
        webSocketHandler);
    let messageServices = new messageServicesClass(ConvToMessage, Messages,
        ConvToUser, webSocketHandler);
    return {userServices, conversationServices, messageServices}
}


module.exports = load;

