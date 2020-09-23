let express = require('express');
let chatServices = require("../../services/conversationServices");
let createError = require('http-errors');

const router = express.Router();

router.post('/', async function (req, res, next) {
    if (!(req.body.name && req.body.creator && req.body.members && req.body.type)) {
        res.status(400).json("must send not empty name, creator, members and type");
        return;
    }
    try {
        let newConversation = await chatServices.createConversation(req.body.name, req.body.creator, req.body.members, req.body.type);
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
    let conversationData = await chatServices.getConversationMetadata(req.params.conversationId);
    if (conversationData) {
        res.json(conversationData);
    }
    else {
        next(createError(404, `conversation ${req.params.conversationId} not found`));
    }
});

module.exports = router;