let userRequests = require("../database/requests/usersReqeusts");
let User = require("../database/models/user")



function createUser(name) {
        if (userRequests.has(name))
            return false;
        else {
            let newUser = new User(name);
            return userRequests.add(newUser);
        }
}

function getUser(name) {
    return userRequests.get(name)
}

module.exports = {getUser, createUser};
