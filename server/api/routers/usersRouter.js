let express = require('express');
let userServices = require("./../../services/userServices");

const router = express.Router();

router.post('/', async function (req,res) {
    console.log("body:" + req.body.name);
    if (req.body.name === undefined || req.body.name === "") {
        res.status(400).json("must send not empty name");
    }

    let newUser = await userServices.createUser(req.body.name);
    if (newUser !== null) {
        res.json(newUser);
    }
    else {
        res.status(409).json("username already exists");
    }
});

router.get('/:username', async function (req,res) {
    let user = await userServices.getUser(req.params.username);
    if (!user) {
        res.status(404).json("username don't exist");
    }
    else {
        res.json(user);
    }
});

router.delete('/:username', async function (req,res) {
    let name = req.params.username;
    if (await userServices.remove(name)) {
        res.status(200).json(name);
    }
    else {
        res.status(404).json("username don't exist");
    }
});

module.exports = router;