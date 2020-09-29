let userServicesClass = require('../userServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const User = require("../../database/models/user");

describe("userServices", function() {
    let userManager;
    before(() => {
        userManager = {
            has: () => false,
            add: sinon.spy()
        }
    });

    afterEach(() => {
        sinon.reset();
    });

    it("should crete new user", async (done) => {
        let getReturnValue = {username: "adi"};

        class UserStab {
            constructor(username) {
                this.name = username
            }
        }

        let userServices = new userServicesClass(userManager, UserStab, null);
        expect((await userServices.createOrGetUser(new User("adi")))).to.be.eql({name: "adi"});
        expect(userManager.add.calledOnce).to.be.true;
        expect(userManager.add.firstCall.args[0]).to.contain({name: "adi"});
        done();
    });
});