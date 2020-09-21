//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('requests');
let server = require('../../app');
let userManager = require('../../database/requests/usersReqeusts')
const User = require("../../database/models/user");
const { expect } = chai;

chai.use(chaiHttp);

describe('Users', () => {


    describe('POST /users', () => {
        beforeEach((done) => {
            userManager.clear();
            done();
        })

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
            let requester = chai.request(server).keepOpen();

            Promise.all([
                requester
                    .put('/users')
                    .send({"name": "adi"}),
                requester
                    .put('/users')
                    .send({"name": "adi"}),
            ]).then(responses => {
                console.log(responses[0].statusCode);
                console.log(responses[1].statusCode);
                let statusCodes = responses.map((response) => response.statusCode);
                expect(statusCodes).to.contain(200);
                expect(statusCodes).to.contain(409);
                done();
            }).catch((err) => console.error(err));
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
        beforeEach((done) => {
            userManager.clear();
            userManager.add(new User("adi2"));
            done();
        })
        it('it should get adi user', (done) => {
            chai.request(server)
                .get('/users/adi2')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.equals("adi2");
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
        beforeEach((done) => {
            userManager.clear();
            userManager.add(new User("moran"));
            done();
        })
        it('it should delete adi user', (done) => {
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