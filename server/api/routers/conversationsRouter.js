let express = require('express');
let chatServices = require("../../services/conversationServices");

const router = express.Router();

router.post('/', function (req,res) {
    if (!(req.body.name && req.body.creator && req.body.members && req.body.type)) {
        res.status(400).json("must send not empty name, creator, members and type");
        return;
    }
    try {
        let newConversation = chatServices.createConversation(req.body.name, req.body.creator, req.body.members, req.body.type);
        if (newConversation !== null) {
            res.json(newConversation);
        }
        else {
            res.status(409).json("one of the users dont exist");
        }
    }
    catch (err) {
        res.status(err.httpCode || 500).json(err.message);
    }


});

module.exports = router