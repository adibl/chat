let conversationServicesFactory = require('./conversationServices');
const chai = require("chai");
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require("sinon");

describe("conversationServices", function() {
    let conversationModel = function () {};
    let conversationToUsers;
    let userServices;
    let webSocket;

    before(() => {
        conversationModel.deleteMany = sinon.spy();
        conversationModel.lean = sinon.spy((obj) => obj);
        conversationModel.prototype.save = sinon.spy();
        conversationModel.prototype.toJSON = sinon.fake.returns({creator: "rotem", id: "123"});

        conversationToUsers = {
            add : sinon.spy(() => ['adi', 'mor']),
            clear: sinon.spy()
        };

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

    it("clear should clear indexes", async () => {

        let conversationServices = new conversationServicesFactory(conversationModel, null,
            conversationToUsers, webSocket);

        await conversationServices.clear();
        expect(conversationModel.deleteMany.calledOnce).to.be.true;
        expect(conversationToUsers.clear.calledOnce).to.be.true;
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
        let lean = {lean: sinon.fake.returns({"creator": "adi", "name":"group"})};
        conversationModel.findById = () => lean;

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