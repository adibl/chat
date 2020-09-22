let usersManager = require("../database/requests/usersReqeusts");
let User = require("../database/models/user");


async function createUser(name) {
        if (await usersManager.has(name))
            return null;
        else {
            let newUser = new User(name);
            return usersManager.add(newUser);
        }
}

async function getUser(name) {
    return usersManager.get(name)
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

module.exports = {getUser, createUser, remove, clear, hasUser};
