let express = require('express');
let createError = require('http-errors');
const Message = require("../../database/models/message");

function CreateRouter(messageServices) {


    const router = express.Router();

    router.post('/:conversationId', async function (req, res, next) {
        try {
            let messageToSend = new Message(req.body);
            let message = await messageServices.sendMessageToGroup(messageToSend, req.params.conversationId);
            res.status(200).json(message);
        }
        catch (e) {
            if (e instanceof TypeError) {
                next(createError(400, e));
            }

            next(createError(500, e));
        }


    });

    return router;
}

module.exports = CreateRouter;