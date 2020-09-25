let express = require('express');
let createError = require('http-errors');

function CreateRouter(conversationServices) {
    const router = express.Router();

    router.post('/', async function (req, res, next) {
        try {
            let newConversation = await conversationServices.createConversation(req.body, req.body.members);
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
            else if (err instanceof TypeError) {
                next(createError(400, err));
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
