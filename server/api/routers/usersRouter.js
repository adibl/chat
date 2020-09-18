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
        res.status(409).json("username already exzists");
    }
})

module.exports = router