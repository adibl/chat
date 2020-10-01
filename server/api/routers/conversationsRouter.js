let express = require('express');
let createError = require('http-errors');
const Conversation = require("../../databaseModels/conversation");

function CreateRouter(conversationServices) {
    const router = express.Router();

    router.post('/', async function (req, res, next) {
        try {
            let conversation = Object.assign(new Conversation(), req.body);
            let newConversation = await conversationServices.createConversation(conversation, req.body.members);
            res.json(newConversation);
        }
        catch (err) {
            if (err instanceof RangeError) {
                next(createError(400, err));
            }
            else if (err instanceof TypeError) {
                next(createError(404, err));
            }

            next(createError(500, err));
        }
    });

    router.get('/:conversationId', async function (req, res, next) {
        try {
            let conversationData = await conversationServices.getConversation(req.params.conversationId);
            res.json(conversationData);
        }
        catch (err) {
            next(createError(404, err));
        }
    });

    return router;
}

module.exports = CreateRouter;
