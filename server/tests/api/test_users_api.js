//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let users = require('../../database/requests/usersReqeusts')
const { expect } = chai;

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        users.clear();
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
    });

});