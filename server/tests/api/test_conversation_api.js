process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let userManager = require('../../services/userServices');
let chatManager = require('../../database/requests/conversationsRequests');
let conversationManager = require("../../services/conversationServices");
let {Conversation} = require("../../database/models/conversation");
let {expect} = chai;
let uuid = require('uuid');

chai.use(chaiHttp);

describe('Chats', () => {
    before((done) => {
        userManager.clear();
        userManager.createUser("adi");
        userManager.createUser("matan");
        userManager.createUser("rotem");
        done();
    });

    describe('POST /conversations', () => {
        after(async (done) => {
            await chatManager.clear();
            done();
        });

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
                    expect(res).to.have.status(409);
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
            await conversationManager.clear();
            let conversation = await conversationManager.createConversation(new Conversation(null, "adi", "personal"), ["matan"]);
            conversationId = conversation.id;
            done();
        });

        it('it should create new conversation', (done) => {
            chai.request(server)
                .get(`/conversations/${conversationId}`)
                .end((err, res) => {
                    expect(res.error).to.be.false;
                    expect(res).to.have.status(200);
                    expect(res.body.creator).to.equals("adi");
                    expect(res.body.members).to.equals(undefined);
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