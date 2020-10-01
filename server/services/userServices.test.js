let userServicesClass = require('./userServices');
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const User = require("../databaseModels/user");

describe("userServices", function() {
    let mongooseModel = function () {};

    class UsersMock {
        constructor(name) {
            this.name = name;
        }
    }

    before(() => {
        mongooseModel.find = sinon.spy();
        mongooseModel.findOne = sinon.fake.returns({name: "adi"});
        mongooseModel.lean = sinon.spy();
        mongooseModel.prototype.save = sinon.spy();
    });

    afterEach(() => {
        sinon.reset();
    });

    it("should crete new user", async () => {
        mongooseModel.findOne = sinon.fake.returns(null);
        mongooseModel.prototype.toJSON = sinon.fake.returns({name: "adi2"});

        let userServices = new userServicesClass(mongooseModel, UsersMock);
        expect((await userServices.createOrGetUser("adi2"))).to.be.eql({name: "adi2"});
        expect(mongooseModel.findOne.calledOnce).to.be.true;
        expect(mongooseModel.prototype.save.calledOnce).to.be.true;
    });


    it("should return existing user", async () => {
        mongooseModel.prototype.toJSON = sinon.fake.returns({name: "adi"});

        let userServices = new userServicesClass(mongooseModel, UsersMock);
        expect((await userServices.createOrGetUser("adi"))).to.be.eql({name: "adi"});
        expect(mongooseModel.prototype.save.calledOnce).to.be.true;
    });
});