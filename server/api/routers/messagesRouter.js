let express = require('express');
let messageServices = require("./../../services/messagesServices");
let createError = require('http-errors');

const router = express.Router();

router.post('/:conversationId', async function (req,res, next) {
    try {
        let message = await messageServices.sendMessage(req.body, req.params.conversationId);
        res.status(200).json(message);
    }
    catch (e) {
        if (e instanceof RangeError) {
            next(createError(400, e));
        }

        next(createError(500, e));
    }


});

module.exports = router;