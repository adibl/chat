let chatsData = require("../database/requests/conversationsRequests");
let userServices = require("./userServices");
let conversation = require("../database/models/conversation");
let conversationToUsers = require("../database/requests/conversationToUsers");
let conversationToMessages = require("../database/requests/conversationToMessages");
let ApiError = require("../ApiError");


function _testUsersExist(usernames) {
    for(let user of usernames) {
        if (!userServices.hasUser(user)) {
            throw new ApiError(409, `user ${user} dont exist`)
        }
    }
}


function createConversation(name, creator, members, type) {
    _testUsersExist([...members, creator]);

    let newChat = new conversation(name, creator, type);
    if (!chatsData.add(newChat)) {
        throw new ApiError(500, "cant access to server");
    }

    if (!conversationToUsers.add(newChat.id, [...members, creator])) {
        throw new ApiError(500, "cant access to server");
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
