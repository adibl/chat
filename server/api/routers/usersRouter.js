let express = require('express');
let userServices = require("./../../services/userServices");

const router = express.Router();

router.put('/', function (req,res) {
    console.log("body:" + req.body);
    let newUser = userServices.createUser(req.body.name);
    if (newUser !== null) {
        res.json(newUser);
    }
    else {
        res.status(409);
    }
})

module.exports = router