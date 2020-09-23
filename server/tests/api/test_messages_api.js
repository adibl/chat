process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');

let servicesLoader = require('../../loaders/services');
let webSocketLoader = require("../../loaders/webSocket");
let {userServices, conversationServices, messageServices} = servicesLoader(webSocketLoader(server));
let {Conversation} = require("../../database/models/conversation");

const {expect} = chai;

chai.use(chaiHttp);

describe('Messages', () => {
    let conversationId = null;

    before(async (done) => {
        await userServices.clear();
        await userServices.createUser("adi");
        await userServices.createUser("matan");
        await userServices.createUser("rotem");
        let conversation = await conversationServices.createConversation(new Conversation(null, "adi", "personal"), ["rotem"]);
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