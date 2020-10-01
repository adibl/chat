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
            let message;

            before(async () => {
                try {
                    await mongoose.connection.db.dropCollection('convtomessages');
                    await mongoose.connection.db.dropCollection('messages');
                }
                catch (e) {
                }

                message = await messageServices.sendMessageToGroup({text: "first", sender: "adi"}, conversationId);
                await messageServices.sendMessageToGroup({text: "second", sender: "adi"}, conversationId);
            });

            after(async () => {
                await mongoose.connection.db.dropCollection('convtomessages');
                await mongoose.connection.db.dropCollection('messages');
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