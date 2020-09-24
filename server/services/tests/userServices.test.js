let userServicesClass = require('../userServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

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
        expect((await userServices.createUser("adi"))).to.be.eql({name: "adi"});
        expect(userManager.add.calledOnce).to.be.true;
        expect(userManager.add.firstCall.args[0]).to.contain({name: "adi"});
        done();
    });

    it("should fail to create new user because user already exists", async (done) => {
        let getReturnValue = {username: "adi"};
        userManager.has = () => true;

        let userServices = new userServicesClass(userManager, null, null);
        expect((await userServices.createUser("adi"))).to.be.null;
        expect(userManager.add.notCalled).to.be.true;
        done();
    });
});