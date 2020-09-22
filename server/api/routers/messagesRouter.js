let express = require('express');
let messageServices = require("./../../services/messagesServices");
const ApiError = require("../../ApiError");

const router = express.Router();

router.post('/:conversationId', async function (req,res) {
    try {
        let message = await messageServices.sendMessage(req.body, req.params.conversationId);
        res.status(200).json(message);
    }
    catch (e) {
        if (e instanceof ApiError) {
            res.status(e.httpCode).send(e.message);
        }
        else {
            res.status(500).send("unknown error");
        }
    }


});

module.exports = router;