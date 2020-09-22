process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let userManager = require('../../database/requests/usersReqeusts');
let chatManager = require('../../database/requests/conversationsRequests');
const User = require("../../database/models/user");
const { expect } = chai;

chai.use(chaiHttp);

describe('Chats', () => {
    before((done) => {
        userManager.clear();
        userManager.add(new User("adi"));
        userManager.add(new User("matan"));
        userManager.add(new User("rotem"));
        done();
    })

    describe('POST /conversations', () => {
        beforeEach((done) => {
            chatManager.clear();
            done();
        })

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



});