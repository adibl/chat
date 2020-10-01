let messagesServicesFactory = require('./messagesServices');
const chai = require("chai");
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require("sinon");
var mongoose = require('mongoose');


describe("messagesServices", function() {
    let message = {text: "data", sender: "adi"};
    let conversationToUsers = function () {};
    let conversationToMessages = function () {};
    let webSocketHandler;
    let mongooseModel = function () {};

    before(() => {
        conversationToUsers.create = sinon.spy();
        let lean2 = {lean: sinon.fake.returns([{username:"adi"}, {username:"mor"}])};
        conversationToUsers.find = () => lean2;

        conversationToMessages.prototype.save = sinon.spy();


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
        expect( conversationToMessages.prototype.save.calledOnce).to.be.true;
        expect(mongooseModel.prototype.save.calledOnce).to.be.true;
        expect(webSocketHandler.sendMessage.calledOnce).to.be.true;
    });

    it("should fail due to null message", async () => {
        let messagesServices = new messagesServicesFactory(conversationToMessages, mongooseModel,
        conversationToUsers, webSocketHandler);
        await expect(messagesServices.sendMessageToGroup(null, "0000")).to.be.rejectedWith(Error);
    });

    it("should fail because no users in group", async () => {

        let lean2 = {lean: sinon.fake.returns(null)};
        conversationToUsers.find = () => lean2;

        let messagesServices = new messagesServicesFactory(conversationToMessages, mongooseModel,
            conversationToUsers, webSocketHandler);
        await expect(messagesServices.sendMessageToGroup(message, "0000")).to.be.rejectedWith(Error);
    });

    it("should fail because incorrect group id", async () => {

        let messagesServices = new messagesServicesFactory(conversationToMessages, mongooseModel,
            conversationToUsers, webSocketHandler);
        await expect(messagesServices.sendMessageToGroup(message, "1111")).to.be.rejectedWith(Error);
    });
});