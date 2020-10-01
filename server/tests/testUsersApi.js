process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let mongoose = require('mongoose');
let servicesLoader = require('../loaders/servicesLoader');
let webSocketLoader = require("../loaders/webSocketLoader");
const databaseLoader = require("../loaders/databseLoader");
let database = databaseLoader.load();
let webSocket =  webSocketLoader(server, database);
let {userServices, conversationServices} = servicesLoader(database,webSocket);
const {expect} = chai;

chai.use(chaiHttp);

describe('Users', () => {
    before(async () => {
        await userServices.createOrGetUser('adi2');
        await userServices.createOrGetUser('mor');
        await userServices.createOrGetUser('amir');
    });


    after(async () => {
        await mongoose.connection.db.dropCollection('users');
    });

    describe('get /users', () => {

        it('get usernames', (done) => {
            chai.request(server)
                .get('/users?index=0&limit=2')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.usernames).to.be.length(2);
                    expect(res.body.usernames).to.be.eql(['adi2', 'amir']);
                    done();
                });
        });

        it('return empty because end is reached', (done) => {
            chai.request(server)
                .get('/users?index=10&limit=2')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.usernames).to.be.length(0);
                    done();
                });
        });

        it('return error because there is no index value', (done) => {
            chai.request(server)
                .get('/users?limit=2')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it('return error because index is not a number', (done) => {
            chai.request(server)
                .get('/users?index=a&limit=2')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe('POST /users', () => {

        it('it should create new user', (done) => {
            chai.request(server)
                .post('/users')
                .send({"name": "moti"})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("moti");
                    done();
                });
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
        before(async () => {
            await conversationServices.createConversation({creator: "adi2", type: "personal"}, []);
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
        before(async () => {
            await userServices.createOrGetUser('tomer');
        });

        it('it should delete tomer user', (done) => {
            chai.request(server)
                .delete('/users/tomer')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.equals("tomer");
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