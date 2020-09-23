process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let servicesLoader = require('../../loaders/services');
let webSocketLoader = require("../../loaders/webSocket");
let {userServices, conversationServices, messageServices} = servicesLoader(webSocketLoader(server));
const User = require("../../database/models/user");
const {Conversation} = require("../../database/models/conversation");
const {expect} = chai;

chai.use(chaiHttp);

describe('Users', () => {


    describe('POST /users', () => {
        beforeEach(async (done) => {
            await userServices.clear();
            done();
        });

        it('it should create new user', (done) => {
            chai.request(server)
                .post('/users')
                .send({"name": "adi"})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("adi");
                    done();
                });
        });

        it('it should fail to create 2 users with the same name', (done) => {
            let requester = chai.request(server).keepOpen();

            Promise.all([
                requester
                    .post('/users')
                    .send({"name": "adi"}),
                requester
                    .post('/users')
                    .send({"name": "adi"}),
            ]).then(responses => {
                let statusCodes = responses.map((response) => response.statusCode);
                expect(statusCodes).to.contain(200);
                expect(statusCodes).to.contain(409);
                done();
            }).catch((err) => console.error(err));
        });

        it('it should fail to create user without a name', (done) => {
            chai.request(server)
                .post('/users')
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('it should fail to create user with empty name', (done) => {
            chai.request(server)
                .post('/users')
                .send({"name": ""})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });


    describe('GET /users/{username}', () => {
        beforeEach(async (done) => {
            await userServices.clear();
            await userServices.createUser("adi2");
            await conversationServices.createConversation(new Conversation(null, "adi2", "personal"),[]);
            done();
        });

        it('it should get adi user', (done) => {
            chai.request(server)
                .get('/users/adi2')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("adi2");
                    expect(res.body.conversations).to.be.an('array');
                    done();
                });
        });

        it('it should fail getting user', (done) => {
            chai.request(server)
                .get('/users/noSuchName')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe('DELETE /users/{username}', () => {
        beforeEach(async (done) => {
            await userServices.clear();
            await userServices.createUser("moran");
            done();
        });

        it('it should delete moran user', (done) => {
            chai.request(server)
                .delete('/users/moran')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.equals("moran");
                    done();
                });
        });

        it('it should fail delete user', (done) => {
            chai.request(server)
                .delete('/users/noSuchName')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it('it should fail delete user', (done) => {
            chai.request(server)
                .delete('/users/')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});