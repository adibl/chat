//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('requests');
let server = require('../../app');
let users = require('../../database/requests/usersReqeusts')
const User = require("../../database/models/user");
const { expect } = chai;
const userManager = new users();

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        userManager.clear();
        done();
    });

    describe('POST /users', () => {
        it('it should create new user', (done) => {
            chai.request(server)
                .put('/users')
                .send({"name": "adi"})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("adi");
                    done();
                });
        });

        it('it should fail to create 2 users with the same name', (done) => {
            let req = chai.request(server)
                .put('/users')
                .send({"name": "adi"})
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("adi");

                }).then(chai.request(server)
                    .put('/users')
                    .send({"name": "adi"})
                    .end((err, res) => {
                        expect(res).to.have.status(409);
                        done();
                    }));
        });

        it('it should fail to create user without a name', (done) => {
            let req = chai.request(server)
                .put('/users')
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('it should fail to create user with empty name', (done) => {
            let req = chai.request(server)
                .put('/users')
                .send({"name": ""})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

    });


    describe('GET /users/{username}', () => {
        before((done) => {
            userManager.add(new User("adi"));
            done();
        })
        it('it should get adi user', (done) => {
            chai.request(server)
                .get('/users/adi')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("adi");
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


});