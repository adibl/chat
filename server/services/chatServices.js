let chatsData = require("../database/requests/chatsRequests");
let userServices = require("./userServices");
let Chat = require("../database/models/chat");


function createChat(chat) {
    for(let user of [...chat.members, chat.creator]) {
        if (!userServices.hasUser(user)) {
            return null
        }
    }

    let newChat = new Chat(chat.name, chat.creator, chat.members);
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

module.exports = {getChatMetadata, createChat, remove, clear, hasChat};
