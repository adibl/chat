let messagesServicesFactory = require('../messagesServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("messagesServices", function() {
    let message = {message: "data", sender: "adi"};
    let conversationToUsers;
    let conversationToMessages;
    let messagesRequests;
    let webSocketHandler;

    before(() => {

        conversationToUsers = {
            getByConversationId: sinon.fake.returns(["adi", "mor"])
        };

        conversationToMessages = {
            add: sinon.spy()
        };

        messagesRequests = {
            add: sinon.spy()
        };

        webSocketHandler = {
            sendMessage: sinon.spy()
        }
    });

    afterEach(() => {
        sinon.reset();
    });

    it("should send message", async (done) => {
        let messagesServices = new messagesServicesFactory(conversationToMessages, messagesRequests,
            conversationToUsers, webSocketHandler);
        expect((await messagesServices.sendMessageToGroup(message, "0000"))).to.be.eql(message);
        expect(conversationToMessages.add.calledOnce).to.be.true;
        expect(messagesRequests.add.calledOnce).to.be.true;
        expect(webSocketHandler.sendMessage.calledOnce).to.be.true;
        expect(webSocketHandler.sendMessage.firstCall.args[0]).to.be.eql(["adi", "mor"]);
        expect(webSocketHandler.sendMessage.firstCall.args[1]).to.be.eql(message);
        expect(webSocketHandler.sendMessage.firstCall.args[2]).to.be.undefined;
        done();
    });

    it("should fail due to invalid message", async (done) => {
        let message = {message: "data", sender: "adi"};

        let getMessageFromJson = sinon.fake.returns(null);

        let messagesServices = new messagesServicesFactory(null, null,
            getMessageFromJson, null, null);
        try {
            await messagesServices.sendMessageToGroup(message, "0000");
        }
        catch (error) {
            expect(error).to.be.an('Error');
            done()
        }
    });

    it("should send message", async (done) => {

        let conversationToUsersReturnNull = {
            getByConversationId: sinon.fake.returns(null)
        };

        let messagesServices = new messagesServicesFactory(conversationToMessages, messagesRequests,
            conversationToUsersReturnNull, webSocketHandler);
        expect((await messagesServices.sendMessageToGroup(message, "0000"))).to.be.eql(message);
        expect(webSocketHandler.sendMessage.notCalled).to.be.true;
        done();
    });
});