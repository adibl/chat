let express = require('express');
let chatServices = require("../../services/conversationServices");

const router = express.Router();

router.post('/', async function (req,res) {
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
            res.status(409).json("one of the users dont exist");
        }
    }
    catch (err) {
        res.status(err.httpCode || 500).json(err.message);
    }


});

router.get('/:conversationId', async function (req,res) {
    let conversationData = await chatServices.getConversationMetadata(req.params.conversationId);
    if (conversationData) {
        res.json(conversationData);
    }

    res.status(404).json(`conversation ${req.params.conversationId} not found`);
});

module.exports = router;