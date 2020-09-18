let userRequests = require("../database/requests/usersReqeusts");
let User = require("../database/models/user")
let usersManager = new userRequests();



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

module.exports = {getUser, createUser};
