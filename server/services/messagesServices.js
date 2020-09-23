let conversationToMessages = require("../database/requests/conversationToMessages");
let messagesRequests = require("../database/requests/messagesRequests");
let {message, getMessageFromJson} = require("../database/models/message");
let conversationToUsers = require("../database/requests/conversationToUsers");
let webSocketHandler = require("../api/webSocketInitializer");


async function sendMessageToGroup(messageJson, conversationId) {
    let message = getMessageFromJson(messageJson);

    if (!message) {
        throw new RangeError("message must have text and sender");
    }
    await messagesRequests.add(message);
    await conversationToMessages.add(conversationId, message);
    let users = await conversationToUsers.getByConversationId(conversationId);
    await webSocketHandler.getInstance().sendMessage(conversationId, users, message);
    return message;
}

module.exports = {sendMessage: sendMessageToGroup};
