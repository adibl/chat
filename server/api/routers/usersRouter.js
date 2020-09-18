let express = require('express');
let userServices = require("./../../services/userServices");

const router = express.Router();

router.put('/', function (req,res) {
    console.log("body:" + req.body.name);
    if (req.body.name === undefined || req.body.name === "") {
        res.status(400).json("must send not empty name");
    }

    let newUser = userServices.createUser(req.body.name);
    if (newUser !== null) {
        console.log("create new user named " + JSON.stringify(newUser));
        res.json(newUser);
    }
    else {
        res.status(409).json("username already exists");
    }
});

router.get('/:username', function (req,res) {
    let user = userServices.getUser(req.params.username);
    if (!user) {
        res.status(404).json("username don't exist");
    }
    else {
        res.json(user);
    }
});

module.exports = router