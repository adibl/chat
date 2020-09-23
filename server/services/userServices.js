let usersManager = require("../database/requests/usersReqeusts");
let User = require("../database/models/user");
let conversationToUsers = require("../database/requests/conversationToUsers");


async function createUser(name) {
    if (await usersManager.has(name)) {
        return null;
    }
    else {
        let newUser = new User(name);
        await usersManager.add(newUser);
        return newUser;
    }
}

async function getUser(name) {
    return usersManager.get(name);
}

async function getUserConversations(name) {
    return await conversationToUsers.getByUsername(name);
}

async function hasUser(name) {
    return usersManager.has(name);
}

async function remove(name) {
    return usersManager.remove(name);
}

async function clear() {
    return usersManager.clear();
}

module.exports = {getUser, createUser, remove, clear, hasUser, getUserConversations};
