let express = require('express');
let createError = require('http-errors');

function CreateRouter(conversationServices) {
    const router = express.Router();

    router.post('/', async function (req, res, next) {
        try {
            let newConversation = await conversationServices.createConversation(req.body, req.body.members);
            res.json(newConversation);
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
