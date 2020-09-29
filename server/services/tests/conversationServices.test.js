let conversationServicesFactory = require('../conversationServices');
const chai = require("chai");
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const sinon = require("sinon");

describe("conversationServices", function() {
    let conversationRequests;
    let conversationToUsers;
    let conversationToMessages;
    let userServices;
    let webSocket;

    before(() => {
        conversationRequests = {
            add: sinon.spy(() => ({"creator": "adi", "name":"group"})),
            clear: sinon.spy()
        };
        conversationToUsers = {
            add : sinon.spy(() => ['adi', 'mor']),
            clear: sinon.spy()
        };
        conversationToMessages = {
            create: sinon.spy(() => []),
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

        let conversationServices = new conversationServicesFactory(conversationRequests, null,
            conversationToUsers, conversationToMessages, webSocket);

        await conversationServices.clear();
        expect(conversationRequests.clear.calledOnce).to.be.true;
        expect(conversationToUsers.clear.calledOnce).to.be.true;
        expect(conversationToMessages.clear.calledOnce).to.be.true;
    });


    it("should create conversation", async () => {
        let conversationServices = new conversationServicesFactory(conversationRequests, userServices,
            conversationToUsers, conversationToMessages, webSocket);

        let conversation = await conversationServices.createConversation({name: "rotem"}, ["mor", "adi"]);
        expect(conversation).to.be.eql({name: "rotem"});
    });

    it("create conversation fail due to undefined members", async () => {
        let conversationServices = new conversationServicesFactory(conversationRequests, userServices,
            conversationToUsers, conversationToMessages, webSocket);
        await expect(conversationServices.createConversation({name: "rotem"})).to.be.rejectedWith(Error);
    });

    it("create conversation fail because user dont exist", async () => {
        let userServices = {
            hasUser: sinon.fake((username) => username !== "adi")
        };
        let conversationServices = new conversationServicesFactory(conversationRequests, userServices,
            conversationToUsers, conversationToMessages, webSocket);

            await expect(conversationServices.createConversation({name: "rotem"}, ["mor", "adi"]))
                .to.be.rejectedWith(Error);
    });

    it("get conversation should work", async () => {
        conversationRequests.get = () => ({"creator": "adi", "name":"group"});
        conversationToUsers.getByConversationId = () => ['adi', 'mor'];
        let conversationServices = new conversationServicesFactory(conversationRequests, userServices,
            conversationToUsers, conversationToMessages, webSocket);

        let conversation = await conversationServices.getConversation("123456");
        expect(conversation).to.be.eql({"creator": "adi", "name":"group", "members": ['adi', 'mor']});
    });

    it("get conversation fail, conversation dont exist", async () => {
        let conversationServices = new conversationServicesFactory(conversationRequests, userServices,
            conversationToUsers, conversationToMessages, webSocket);

        try {
            await conversationServices.getConversation("123456");
        }
        catch (error) {
            expect(error).to.be.an('Error');
        }
    });
});