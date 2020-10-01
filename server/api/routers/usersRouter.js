let express = require('express');
let createError = require('http-errors');
let mongoose = require('mongoose');

function CreateRouter(userServices) {
    const router = express.Router();

    router.get('/', async function (req, res, next) {
        let index = req.query.index;
        let limit = req.query.limit;
        if (!isNaN(Number(index)) && !isNaN(Number(limit))) {
            let users = await userServices.getUsernamesSorted(Number(index), Number(limit));
            res.json({usernames: users});
        }
        else {
            next(createError(404, "must contain integers limit and index as url parameters"));
        }
    });


    router.post('/', async function (req, res, next) {
        try {
            let newUser = await userServices.createOrGetUser(req.body.name);
            res.json(newUser);
        }
        catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                next(createError(400), e);
            }

            next(createError(500, e));
        }
    });

    router.get('/:username', async function (req, res, next) {
        let user = await userServices.getUser(req.params.username);
        if (!user) {
            next(createError(404, "username don't exist"));
        }
        else {
            user.conversations = await userServices.getUserConversations(req.params.username);
            res.json(user);
        }
    });

    router.delete('/:username', async function (req, res, next) {
        let name = req.params.username;
        if (await userServices.remove(name)) {
            res.status(200).json(name);
        }
        else {
            next(createError(404, "username don't exist"));
        }
    });

    return router;
}

module.exports = CreateRouter;