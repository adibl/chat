process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let {expect} = chai;
let uuid = require('uuid');
let servicesLoader = require('../loaders/servicesLoader');
let webSocketLoader = require("../loaders/webSocketLoader");
const databaseLoader = require("../loaders/databseLoader");
let database = databaseLoader.load();
let webSocket =  webSocketLoader(server, database);
let {userServices, conversationServices} = servicesLoader(database,webSocket);

chai.use(chaiHttp);

describe('Conversation', () => {
    before(async () => {
        await userServices.clear();
        await userServices.createOrGetUser("adi");
        await userServices.createOrGetUser("matan");
        await userServices.createOrGetUser("rotem");
    });

    after(async () => {
        await userServices.clear();
    });

    describe('POST /conversations', () => {

        it('it should create new conversation', (done) => {
            chai.request(server)
                .post('/conversations')
                .send({"name": "newChat", "creator": "adi", "members": ["matan", "rotem"], "type": "group"})
                .end((err, res) => {
                    expect(res.error).to.be.false;
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("newChat");
                    expect(res.body.creator).to.equals("adi");
                    done();
                });
        });

        it('it should fail due to user dont exist', (done) => {
            chai.request(server)
                .post('/conversations')
                .send({"name": "newChat", "creator": "adi", "members": ["matan", "DontExist"], "type": "group"})
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it('it should fail due to no members in request', (done) => {
            chai.request(server)
                .post('/conversations')
                .send({"name": "newChat", "creator": "adi"})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('GET /conversations/{conversationId}', () => {
        let conversationId = null;

        beforeEach(async (done) => {
            await conversationServices.clear();
            let conversation = await conversationServices.createConversation({creator: "adi", type:"personal"}, ["matan"]);
            conversationId = conversation.id;
            done();
        });

        it('it should get conversation', (done) => {
            chai.request(server)
                .get(`/conversations/${conversationId}`)
                .end((err, res) => {
                    expect(res.error).to.be.false;
                    expect(res).to.have.status(200);
                    expect(res.body.creator).to.equals("adi");
                    expect(res.body.members).to.eql(["matan", "adi"]);
                    expect(res.body.type).to.equals("personal");
                    done();
                });
        });

        it('it should fail due to id is wrong', (done) => {
            chai.request(server)
                .get(`/conversations/${uuid.v4()}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});