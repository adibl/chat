let express = require('express');
let createError = require('http-errors');
let {Conversation, getConversationFromJson} = require('../../database/models/conversation');

function CreateRouter(conversationServices) {
    const router = express.Router();

    router.post('/', async function (req, res, next) {
        let conversation = getConversationFromJson(req.body);
        if (!conversation) {
            res.status(400).json("conversation is invalid");
            return;
        }
        try {
            let newConversation = await conversationServices.createConversation(conversation, req.body.members);
            if (newConversation !== null) {
                res.json(newConversation);
            }
            else {
                next(createError(409, "one of the users dont exist"));
            }
        }
        catch (err) {
            if (err instanceof RangeError) {
                next(createError(409, err));
            }

            next(createError(500, err));
        }
    });

    router.get('/:conversationId', async function (req, res, next) {
        let conversationData = await conversationServices.getConversationMetadata(req.params.conversationId);
        if (conversationData) {
            res.json(conversationData);
        }
        else {
            next(createError(404, `conversation ${req.params.conversationId} not found`));
        }
    });

    return router;
}

module.exports = CreateRouter;
