let chatsData = require("../database/requests/conversationsRequests");
let userServices = require("./userServices");
let conversation = require("../database/models/conversation");


function createConversation(name, creator, members, type) {
    for(let user of [...members, creator]) {
        if (!userServices.hasUser(user)) {
            return null
        }
    }

    let newChat = new conversation(name, creator, type);
    return chatsData.add(newChat);
}

function getChatMetadata(id) {
    return chatsData.get(id)
}

function hasChat(id) {
    return chatsData.has(id);
}

function remove(id) {
    return chatsData.remove(id);
}

function clear() {
    chatsData.clear();
}

module.exports = {getChatMetadata, createConversation, remove, clear, hasChat};
