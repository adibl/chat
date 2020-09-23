let chatsData = require("../database/requests/conversationsRequests");
let userServices = require("./userServices");
let conversation = require("../database/models/conversation");
let conversationToUsers = require("../database/requests/conversationToUsers");
let conversationToMessages = require("../database/requests/conversationToMessages");


async function _testUsersExist(usernames) {
    for (let user of usernames) {
        if (!await userServices.hasUser(user)) {
            throw new RangeError(`user ${user} dont exist`);
        }
    }
}

async function createConversation(conversation, members) {
    await _testUsersExist([...members, conversation.creator]);

    await chatsData.add(conversation);
    await conversationToUsers.add(conversation.id, [...members, conversation.creator]);
    await conversationToMessages.add(conversation.id);

    return conversation;
}

async function getConversationMetadata(id) {
    return chatsData.get(id);
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
