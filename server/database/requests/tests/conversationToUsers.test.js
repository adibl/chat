let conversationToUsers = require('../conversationToUsers');
const chai = require("chai");
const expect = chai.expect;

describe("conversationToUsers", function() {
    beforeEach(async (done) => {
        await conversationToUsers.clear();
        done();
    });

    it("should create conversation", async (done) => {
        await conversationToUsers.add("1223", []);
        expect(await conversationToUsers.getByConversationId("1223")).to.be.an("Array");
        done();
    });

    it("should add message to conversation", async (done) => {
        let users = ["adi", "rotem", "mor"];
        await conversationToUsers.add("1223", users);
        expect(await conversationToUsers.getByConversationId("1223")).to.be.eql(users);
        for(let user of users) {
            expect(await conversationToUsers.getByUsername(user)).to.be.eql(["1223"]);
        }

        done();
    });
});