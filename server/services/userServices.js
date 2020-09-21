let usersManager = require("../database/requests/usersReqeusts");
let User = require("../database/models/user")


function createUser(name) {
        if (usersManager.has(name))
            return null;
        else {
            let newUser = new User(name);
            return usersManager.add(newUser);
        }
}

function getUser(name) {
    return usersManager.get(name)
}

function hasUser(name) {
    return usersManager.has(name);
}

function remove(name) {
    return usersManager.remove(name);
}

function clear() {
    usersManager.clear();
}

module.exports = {getUser, createUser, remove, clear, hasUser};
