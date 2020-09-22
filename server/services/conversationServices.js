let chatsData = require("../database/requests/conversationsRequests");
let userServices = require("./userServices");
let conversation = require("../database/models/conversation");
let conversationToUsers = require("../database/requests/conversationToUsers");
let conversationToMessages = require("../database/requests/conversationToMessages");



function createConversation(name, creator, members, type) {
    for(let user of [...members, creator]) {
        if (!userServices.hasUser(user)) {
            return null
        }
    }

    let newChat = new conversation(name, creator, type);
    if (!chatsData.add(newChat)) {
        return null;
    }

    if (!conversationToUsers.add(newChat.id, [...members, creator])) {
        return null;
    }

    conversationToMessages.add(newChat.id);
    return newChat;
}

function getConversationMetadata(id) {
    return chatsData.get(id)
}

function hasConversation(id) {
    return chatsData.has(id);
}

function remove(id) {
    return chatsData.remove(id);
}

function clear() {
    chatsData.clear();
}

module.exports = {getConversationMetadata, createConversation, remove, clear, hasConversation};
