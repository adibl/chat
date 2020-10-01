process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

let servicesLoader = require('../loaders/servicesLoader');
let webSocketLoader = require("../loaders/webSocketLoader");
const databaseLoader = require("../loaders/databseLoader");
let database = databaseLoader.load();
let webSocket =  webSocketLoader(server, database);
let {userServices, conversationServices, messageServices} = servicesLoader(database,webSocket);

const {expect} = chai;

chai.use(chaiHttp);

describe('Messages', () => {
    let conversationId = null;

    before(async (done) => {
        await userServices.clear();
        await userServices.createOrGetUser("adi");
        await userServices.createOrGetUser("matan");
        await userServices.createOrGetUser("rotem");
        let conversation = await conversationServices.createConversation({creator:"adi", type:"personal"}, ["rotem"]);
        conversationId = conversation.id;
        done();
    });

    after(async () => {
        await userServices.clear();
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

        it('it should fail, no sender specified', (done) => {
            chai.request(server)
                .post(`/messages/${conversationId}`)
                .send({"text": "hi"})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        describe('GET /messages/:conversationId', () => {
            before(async () => {
                await messageServices.sendMessageToGroup({text: "first", sender: "adi"}, conversationId);
                await messageServices.sendMessageToGroup({text: "second", sender: "adi"}, conversationId);
            });

            after(async () => {
                await messageServices.clean();
            });

            it('it should get first message', (done) => {
                chai.request(server)
                    .get(`/messages/${conversationId}?index=0&limit=1`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('Array');
                        expect(res.body[0].text).to.be.eql('first');
                        done();
                    });
            });

            it('it should get second message', (done) => {
                chai.request(server)
                    .get(`/messages/${conversationId}?index=1&limit=1`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('Array');
                        expect(res.body[0].text).to.be.eql('second');
                        done();
                    });
            });

        });
    });
});