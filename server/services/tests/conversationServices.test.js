let conversationServicesFactory = require('../conversationServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("conversationServices", function() {
    let chatsData;
    let conversationToUsers;
    let conversationToMessages;

    before(() => {
        chatsData = {
            clear: sinon.spy()
        };
        conversationToUsers = {
            clear: sinon.spy()
        };
        conversationToMessages = {
            clear: sinon.spy()
        };
    });

    afterEach(() => {
        sinon.reset();
    });

    it("clear should clear indexes", async () => {

        let conversationServices = new conversationServicesFactory(chatsData, null, conversationToUsers, conversationToMessages);

        await conversationServices.clear();
        expect(chatsData.clear.calledOnce).to.be.true;
        expect(conversationToUsers.clear.calledOnce).to.be.true;
        expect(conversationToMessages.clear.calledOnce).to.be.true;
    });


    it("clear should fail create conversation because user dont exist", async () => {

        let userServices = {
            hasUser: sinon.fake((username) => username !== "adi")
        };
        let conversationServices = new conversationServicesFactory(chatsData, userServices, conversationToUsers, conversationToMessages);

        try {
            await conversationServices.createConversation({name: "rotem"}, ["mor", "adi"]);
        }
        catch (error) {
            expect(error).to.be.an('Error');
        }
    });
});