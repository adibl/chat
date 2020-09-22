let conversationToMessages = require("../database/requests/conversationToMessages");
let messagesRequests = require("../database/requests/messagesRequests");
let {message, getMessageFromJson} = require("../database/models/message");


async function sendMessage(messageJson, conversationId) {
    let message = getMessageFromJson(messageJson);

    if (!message) {
        throw new RangeError("message must have text and sender");
    }
    await messagesRequests.add(message);
    await conversationToMessages.add(conversationId, message);
    return message;
}

module.exports = {sendMessage};
