let conversationToMessage = require('../conversationToMessages');
const chai = require("chai");
const expect = chai.expect;

describe("ConversationToMessages", function() {
    beforeEach(async (done) => {
        await conversationToMessage.clear();
        done();
    });

    it("should create conversation", async (done) => {
        await conversationToMessage.create("1223");
        expect(await conversationToMessage.get("1223")).to.be.an("Array");
        done();
    });

    it("should add message to conversation", async (done) => {
        await conversationToMessage.add("1223", "hi");
        expect(await conversationToMessage.get("1223")).to.be.eql(["hi"]);
        done();
    });
});