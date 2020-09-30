let messagesServicesFactory = require('./messagesServices');
const chai = require("chai");
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require("sinon");
var mongoose = require('mongoose');


describe("messagesServices", function() {
    let message = {text: "data", sender: "adi"};
    let conversationToUsers;
    let conversationToMessages;
    let webSocketHandler;
    let mongooseModel = function () {};



    class messagesRequests {
        constructor() {
        }

        async save() {
        }

        toJSON = sinon.spy().returns(message);
    }

    before(() => {

        conversationToUsers = {
            getByConversationId: sinon.fake.returns(["adi", "mor"])
        };

        conversationToMessages = {
            add: sinon.spy()
        };


        webSocketHandler = {
            sendMessage: sinon.spy()
        };

        mongooseModel.prototype.save = sinon.spy();
        mongooseModel.prototype.toJSON = sinon.stub().returns(message);
    });

    afterEach(() => {
        sinon.reset();
    });

    it("should send message", async () => {
        let messagesServices = new messagesServicesFactory(conversationToMessages, mongooseModel,
            conversationToUsers, webSocketHandler);
        expect((await messagesServices.sendMessageToGroup(message, "0000"))).to.be.eql(message);
        expect(conversationToMessages.add.calledOnce).to.be.true;
        expect(mongooseModel.prototype.save.calledOnce).to.be.true;
        expect(webSocketHandler.sendMessage.calledOnce).to.be.true;
    });

    it("should fail due to null message", async () => {
        let messagesServices = new messagesServicesFactory(conversationToMessages, mongooseModel,
        conversationToUsers, webSocketHandler);
        await expect(messagesServices.sendMessageToGroup(null, "0000")).to.be.rejectedWith(Error)
    });

    it("should fail because no users in group", async () => {

        let conversationToUsersReturnNull = {
            getByConversationId: sinon.fake.returns(null)
        };

        let messagesServices = new messagesServicesFactory(conversationToMessages, mongooseModel,
            conversationToUsersReturnNull, webSocketHandler);
        await expect(messagesServices.sendMessageToGroup(message, "0000")).to.be.rejectedWith(Error)
    });
});