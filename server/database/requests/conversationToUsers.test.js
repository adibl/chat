let conversationToUsersClass = require('./conversationToUsers');
const chai = require("chai");
const expect = chai.expect;

describe("conversationToUsers", function() {
    let conversationToUsers;
    let users = ["adi", "rotem", "mor"];
    before(() => {
        conversationToUsers = new conversationToUsersClass();
    });

    beforeEach(async (done) => {
        await conversationToUsers.clear();
        done();
    });

    it("should create conversation", async (done) => {
        await conversationToUsers.add("1223", users);
        let mappings = conversationToUsers._convToUsers.filter((obj) => obj.convId === "1223");
        expect(mappings).to.be.an("Array");
        expect(mappings.length).to.be.equals(3);
        done();
    });

    it("should add message to conversation", async (done) => {

        await conversationToUsers.add("1223", users);
        expect(await conversationToUsers.getByConversationId("1223")).to.be.eql(users);
        for(let user of users) {
            let mappings = conversationToUsers._convToUsers.filter((obj) => obj.userId === user);
            expect(mappings).to.be.an("Array");
            expect(mappings.length).to.be.equals(1);
        }

        done();
    });
});