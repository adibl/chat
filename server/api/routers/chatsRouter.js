let express = require('express');
let chatServices = require("./../../services/chatServices");

const router = express.Router();

router.put('/', function (req,res) {
    if (!(req.body.name && req.body.creator && req.body.members)) {
        res.status(400).json("must send not empty name and creator ");
    }

    let newUser = chatServices.createChat(req.body);
    if (newUser !== null) {
        res.json(newUser);
    }
    else {
        res.status(409).json("one of the users dont exist");
    }
});

module.exports = router