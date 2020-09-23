//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('requests');
let server = require('../../app');
let userManager = require('../../database/requests/usersReqeusts');
let conversationManager = require("../../services/conversationServices");
const User = require("../../database/models/user");
const {Conversation} = require("../../database/models/conversation");
const {expect} = chai;

chai.use(chaiHttp);

describe('Users', () => {


    describe('POST /users', () => {
        beforeEach(async (done) => {
            await userManager.clear();
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
            await userManager.clear();
            await userManager.add(new User("adi2"));
            await conversationManager.createConversation(new Conversation(null, "adi2", "personal"),[]);
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
            await userManager.clear();
            await userManager.add(new User("moran"));
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