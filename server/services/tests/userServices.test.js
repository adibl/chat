let userServicesClass = require('../userServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const User = require("../../database/models/user");

describe("userServices", function() {
    let userManager;
    class UsersMock {
        constructor(name) {
            this.name = name;
        }
    }

    before(() => {
        userManager = {
            has: () => false,
            add: sinon.spy()
        }
    });

    afterEach(() => {
        sinon.reset();
    });

    it("should crete new user", async () => {
        let userServices = new userServicesClass(userManager, UsersMock);
        expect((await userServices.createOrGetUser("adi"))).to.be.eql({name: "adi"});
        expect(userManager.add.calledOnce).to.be.true;
        expect(userManager.add.firstCall.args[0]).to.contain({name: "adi"});
    });


    it("should return existing user", async () => {
        userManager = {
            has: sinon.spy(() => true),
            get: sinon.spy(() => ({name: "adi"}))
        };

        let userServices = new userServicesClass(userManager, UsersMock);
        expect((await userServices.createOrGetUser("adi"))).to.be.eql({name: "adi"});
        expect(userManager.has.calledOnce).to.be.true;
    });
});