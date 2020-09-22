let express = require('express');
let userServices = require("./../../services/userServices");
let createError = require('http-errors');

const router = express.Router();

router.post('/', async function (req,res, next) {
    if (req.body.name === undefined || req.body.name === "") {
        res.status(400).json("must send not empty name");
    }
    else {
        let newUser = await userServices.createUser(req.body.name);
        if (newUser !== null) {
            res.json(newUser);
        }
        else {
            next(createError(409, "username already exists"));
        }
    }


});

router.get('/:username', async function (req,res, next) {
    let user = await userServices.getUser(req.params.username);
    if (!user) {
        next(createError(404, "username don't exist"));
    }
    else {
        res.json(user);
    }
});

router.delete('/:username', async function (req,res, next) {
    let name = req.params.username;
    if (await userServices.remove(name)) {
        res.status(200).json(name);
    }
    else {
        next(createError(404, "username don't exist"));
    }
});

module.exports = router;