let messagesServicesFactory = require('../messagesServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("messagesServices", function() {

    let message = {message: "data", sender: "adi"}


    let getMessageFromJson = (message) => {
        return message;
    }

    let conversationToUsers = {
        getByConversationId: (convId) => ["adi", "mor"]
    };



    it("should send message", async (done) => {
        let conversationToMessages = {
            add: sinon.spy()
        };

        let messagesRequests = {
            add: sinon.spy()
        };

        let webSocketHandler = {
            sendMessage: sinon.spy()
        }

        let messagesServices = new messagesServicesFactory(conversationToMessages, messagesRequests,
            getMessageFromJson, conversationToUsers, webSocketHandler);
        expect((await messagesServices.sendMessageToGroup(message, "0000"))).to.be.eql(message);
        expect(conversationToMessages.add.calledOnce).to.be.true;
        expect(messagesRequests.add.calledOnce).to.be.true;
        expect(webSocketHandler.sendMessage.calledOnce).to.be.true;
        expect(webSocketHandler.sendMessage.firstCall.args[0]).to.be.equals("0000");
        expect(webSocketHandler.sendMessage.firstCall.args[1]).to.be.eql(["adi", "mor"]);
        expect(webSocketHandler.sendMessage.firstCall.args[2]).to.be.eql(message);
        done();
    });

    it("should fail due to invalid message", async (done) => {
        let message = {message: "data", sender: "adi"}

        let getMessageFromJson = (message) => {
            return null;
        }

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
            getByConversationId: (convId) => null
        };

        let conversationToMessages = {
            add: sinon.stub()
        };

        let messagesRequests = {
            add: sinon.stub()
        };

        let webSocketHandler = {
            sendMessage: sinon.stub()
        }

        let messagesServices = new messagesServicesFactory(conversationToMessages, messagesRequests,
            getMessageFromJson, conversationToUsersReturnNull, webSocketHandler);
        expect((await messagesServices.sendMessageToGroup(message, "0000"))).to.be.eql(message);
        expect(webSocketHandler.sendMessage.notCalled).to.be.true;
        done();
    });
});