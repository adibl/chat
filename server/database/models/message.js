const generateId = require("../../services/IdService");

class Message {
    constructor(text, sender) {
        this.id = generateId();
        this.text = text;
        this.sender = sender;
    }
}


module.exports = Message;