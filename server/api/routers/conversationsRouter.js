let express = require('express');
let chatServices = require("../../services/conversationServices");

const router = express.Router();

router.post('/', function (req,res) {
    if (!(req.body.name && req.body.creator && req.body.members && req.body.type)) {
        res.status(400).json("must send not empty name, creator, members and type");
    }

    let newUser = chatServices.createConversation(req.body.name, req.body.creator, req.body.members, req.body.type);
    if (newUser !== null) {
        res.json(newUser);
    }
    else {
        res.status(409).json("one of the users dont exist");
    }
});

module.exports = router