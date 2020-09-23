//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let userManager = require('../../services/userServices');
let conversationService = require("../../services/conversationServices");
const User = require("../../database/models/user");
const { expect } = chai;

chai.use(chaiHttp);

describe('Messages', () => {
    let conversationId = null;

    before( async (done) => {
        await userManager.clear();
        await userManager.createUser("adi");
        await userManager.createUser("matan");
        await userManager.createUser("rotem");
        let conversation = await conversationService.createConversation("null", "adi", ["rotem"], "private");
        conversationId = conversation.id;
        done();
    });


    describe('POST /messages/:conversationId', () => {

        it('it should create new message', (done) => {
            chai.request(server)
                .post(`/messages/${conversationId}`)
                .send({"text": "hi", "sender": "rotem"})
                .end((err, res) => {
                    expect(res.error).to.be.false;
                    expect(res).to.have.status(200);
                    expect(res.body.text).to.equals("hi");
                    done();
                });
        });

    });


});