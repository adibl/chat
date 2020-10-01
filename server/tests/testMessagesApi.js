process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

let servicesLoader = require('../loaders/servicesLoader');
let webSocketLoader = require("../loaders/webSocketLoader");
const databaseLoader = require("../loaders/databseLoader");
const User = require("../database/models/user");
let database = databaseLoader.load();
let webSocket =  webSocketLoader(server, database);
let {userServices, conversationServices} = servicesLoader(database,webSocket);

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
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});