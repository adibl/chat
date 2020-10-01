let express = require('express');
let createError = require('http-errors');
let mongoose = require('mongoose');
function CreateRouter(messageServices) {


    const router = express.Router();

    router.post('/:conversationId', async function (req, res, next) {
        try {
            let message = await messageServices.sendMessageToGroup(req.body, req.params.conversationId);
            res.status(200).json(message);
        }
        catch (e) {
            if (e instanceof TypeError) {
                next(createError(400, e));
            }
            else if(e instanceof mongoose.Error.ValidationError) {
                next(createError(400), e)
            }

            next(createError(500, e));
        }
    });

    router.get('/:conversationId', async function (req, res, next) {
        let index = req.query.index;
        let limit = req.query.limit;
        if (isNaN(Number(index)) || isNaN(Number(limit))) {
            next(createError(404, "must contain integers limit and index as url parameters"));
        }

        try {
            let messages = await messageServices.getMessages(req.params.conversationId, Number(index), Number(limit));
            res.status(200).json(messages);
        }
        catch (e) {
            if (e instanceof TypeError) {
                next(createError(400, e));
            }
            else if(e instanceof mongoose.Error.ValidationError) {
                next(createError(400), e)
            }

            next(createError(500, e));
        }
    });


    return router;
}

module.exports = CreateRouter;