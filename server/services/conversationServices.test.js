let conversationServicesFactory = require('./conversationServices');
const chai = require("chai");
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require("sinon");
const mongoose = require('mongoose');



describe("conversationServices", function() {
    let conversationModel = function () {};
    let conversationToUsers  = function () {};
    let userServices;
    let webSocket;

    before(() => {
        conversationModel.deleteMany = sinon.spy();
        let lean = {lean: sinon.fake.returns({"creator": "adi", "name":"group"})};
        conversationModel.findById = () => lean;
        conversationModel.prototype.save = sinon.spy();
        conversationModel.prototype.toJSON = sinon.fake.returns({creator: "rotem", id: "123"});

        conversationToUsers.create = sinon.spy();
        let lean2 = {lean: sinon.fake.returns([{username:"adi"}, {username:"mor"}])};
        conversationToUsers.find = () => lean2;

        userServices = {
            hasUser: sinon.spy(() => true)
        };

        webSocket = {
            sendMessage: sinon.spy()
        }
    });

    afterEach(() => {
        sinon.reset();
    });

    it("should create conversation", async () => {
        let conversationServices = new conversationServicesFactory(conversationModel, userServices,
            conversationToUsers, webSocket);

        let conversation = await conversationServices.createConversation({name: "rotem"}, ["mor", "adi"]);
        expect(conversation).to.be.eql({creator: "rotem", id: "123"});
    });

    it("create conversation fail due to undefined members", async () => {
        let conversationServices = new conversationServicesFactory(conversationModel, userServices,
            conversationToUsers, webSocket);
        await expect(conversationServices.createConversation({name: "rotem"})).to.be.rejectedWith(Error);
    });

    it("create conversation fail because user dont exist", async () => {
        let userServices = {
            hasUser: sinon.fake((username) => username !== "adi")
        };
        let conversationServices = new conversationServicesFactory(conversationModel, userServices,
            conversationToUsers, webSocket);

            await expect(conversationServices.createConversation({name: "rotem"}, ["mor", "adi"]))
                .to.be.rejectedWith(Error);
    });

    it("get conversation should work", async () => {


        conversationToUsers.getByConversationId = () => ['adi', 'mor'];
        let conversationServices = new conversationServicesFactory(conversationModel, userServices,
            conversationToUsers, webSocket);

        let conversation = await conversationServices.getConversation("123456");
        expect(conversation).to.be.eql({"creator": "adi", "name":"group", "members": ['adi', 'mor']});
    });

    it("get conversation fail, conversation dont exist", async () => {
        let conversationServices = new conversationServicesFactory(conversationModel, userServices,
            conversationToUsers, webSocket);

        try {
            await conversationServices.getConversation("123456");
        }
        catch (error) {
            expect(error).to.be.an('Error');
        }
    });
});