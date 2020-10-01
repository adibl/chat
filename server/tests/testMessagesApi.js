process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let mongoose = require('mongoose');

let servicesLoader = require('../loaders/servicesLoader');
let webSocketLoader = require("../loaders/webSocketLoader");
const databaseLoader = require("../loaders/databseLoader");
let database = databaseLoader.load();
let webSocket = webSocketLoader(server, database);
let {userServices, conversationServices, messageServices} = servicesLoader(database, webSocket);

const {expect} = chai;

chai.use(chaiHttp);

describe('Messages', () => {
    let conversationId = null;

    before(async (done) => {
        try {
            await mongoose.connection.db.dropCollection('users');
            await mongoose.connection.db.dropCollection('conversations');
            await mongoose.connection.db.dropCollection('convtousers');
        }
        catch (e) {
        }
        await userServices.createOrGetUser("adi");
        await userServices.createOrGetUser("matan");
        await userServices.createOrGetUser("rotem");
        let conversation = await conversationServices.createConversation({creator: "adi", type: "personal"}, ["rotem"]);
        conversationId = conversation.id;
        done();
    });

    after(async () => {
        try {
            await mongoose.connection.db.dropCollection('users');
            await mongoose.connection.db.dropCollection('conversations');
            await mongoose.connection.db.dropCollection('convtousers');
        }
        catch (e) {
        }

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
            let lastMessage;

            before(async () => {
                try {
                    await mongoose.connection.db.dropCollection('convtomessages');
                    await mongoose.connection.db.dropCollection('messages');
                }
                catch (e) {
                }

                 await messageServices.sendMessageToGroup({text: "1", sender: "adi"}, conversationId);
                await messageServices.sendMessageToGroup({text: "2", sender: "adi"}, conversationId);
                lastMessage = await messageServices.sendMessageToGroup({text: "3", sender: "adi"}, conversationId);
            });

            after(async () => {
                await mongoose.connection.db.dropCollection('convtomessages');
                await mongoose.connection.db.dropCollection('messages');
            });

            it('it should get 3 message', (done) => {
                chai.request(server)
                    .get(`/messages/${conversationId}?&limit=1`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('Array');
                        expect(res.body[0].text).to.be.eql('3');
                        done();
                    });
            });

            it('it should get 2 message', (done) => {
                chai.request(server)
                    .get(`/messages/${conversationId}?lastId=${lastMessage.id}&limit=1`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('Array');
                        expect(res.body[0].text).to.be.eql('2');
                        done();
                    });
            });

        });
    });
});