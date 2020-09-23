let conversationServicesFactory = require('../conversationServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("conversationServices", function() {

    it("clear should clear indexes", async (done) => {
        let chatsData = {
            clear: sinon.spy()
        };
        let conversationToUsers = {
            clear: sinon.spy()
        };
        let conversationToMessages = {
            clear: sinon.spy()
        };
        let conversationServices = new conversationServicesFactory(chatsData, null, conversationToUsers, conversationToMessages);

        await conversationServices.clear();
        expect(chatsData.clear.calledOnce).to.be.true;
        expect(conversationToUsers.clear.calledOnce).to.be.true;
        expect(conversationToMessages.clear.calledOnce).to.be.true;
        done();
    });


    it("clear should fail create conversation because user dont exist", async (done) => {
        let chatsData = {
            add: sinon.stub()
        };
        let conversationToUsers = {
            add: sinon.stub()
        };
        let conversationToMessages = {
            create: sinon.stub()
        };

        let hasFunction = sinon.stub();
        hasFunction.returns(true);
        hasFunction.withArgs("adi").returns(false);
        let userServices = {
            hasUser: hasFunction
        }
        let conversationServices = new conversationServicesFactory(chatsData, userServices, conversationToUsers, conversationToMessages);

        try {
            await conversationServices.createConversation({name: "rotem"}, ["mor", "adi"]);
        }
        catch (error) {
            expect(error).to.be.an('Error');
            done()
        }
    });
});