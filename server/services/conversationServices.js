let chatsData = require("../database/requests/conversationsRequests");
let userServices = require("./userServices");
let conversation = require("../database/models/conversation");
let conversationToUsers = require("../database/requests/conversationToUsers");
let conversationToMessages = require("../database/requests/conversationToMessages");



async function _testUsersExist(usernames) {
    for(let user of usernames) {
        if (!await userServices.hasUser(user)) {
            throw new RangeError(`user ${user} dont exist`);
        }
    }
}

async function createConversation(name, creator, members, type) {
    await _testUsersExist([...members, creator]);

    let newChat = new conversation(name, creator, type);
    await chatsData.add(newChat);
    await conversationToUsers.add(newChat.id, [...members, creator]);
    await conversationToMessages.add(newChat.id);

    return newChat;
}

async function getConversationMetadata(id) {
    return chatsData.get(id)
}

async function hasConversation(id) {
    return chatsData.has(id);
}

async function remove(id) {
    return chatsData.remove(id);
}

async function clear() {
    await chatsData.clear();
    await conversationToUsers.clear();
    return conversationToMessages.clear();
}

module.exports = {getConversationMetadata, createConversation, remove, clear, hasConversation};
