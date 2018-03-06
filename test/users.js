process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const User = require('./../app/models/user');
chai.use(chaiHttp);

describe('Tests of User', () => {
  beforeEach(async function () {
    let users = await User.find({});
    if (users) {
      users.forEach((user) => user.remove());
    }
    let userForTest = {name: "Saitama", username: "saitama"};
    let newUser = new User(userForTest);
    await newUser.save();
  });

  afterEach(async () => {
    let users = await User.find({});
    if (users) {
      users.forEach(async user => user.remove());
    }
  });


  it('Should not create user, invalid parameter username', (done) => {
    //invalid username
    let user = {
      name: 'Felipe',
      username: "@felipe",
    };
    chai.request(server)
      .post('/users')
      .send(user)
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('type');
        res.body.should.have.property('title');
        res.body.should.have.property('status');
        res.body.should.have.property('detail');
        res.body.should.have.property('details');
        res.body.should.have.property('instance');
        done();
      });
  });

  it('Should create user', (done) => {
    let user = {
      name: 'Felipe',
      username: "felipe.moura",
    };
    chai.request(server)
      .post('/users')
      .send(user)
      .end((error, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('username');
        res.body.should.have.property('budget');
        res.body.should.have.property('createdAt');
        res.body.should.have.property('updatedAt');
        done();
      });
  });

  it('Should not create user, invalid user missing parameters', (done) => {
    let user = {
      username: "felipe.moura",
    };
    chai.request(server)
      .post('/users')
      .send(user)
      .end((error, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('type');
        res.body.should.have.property('title');
        res.body.should.have.property('status');
        res.body.should.have.property('detail');
        res.body.should.have.property('details');
        res.body.should.have.property('instance');
        done();
      });
  });

  it('Should not create user, user already exists', (done) => {
    let user = {name: "Saitama", username: "saitama"};
    chai.request(server)
      .post('/users')
      .send(user)
      .end((error, res) => {
        // console.log(res.body);
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('type');
        res.body.should.have.property('title');
        res.body.should.have.property('status');
        res.body.should.have.property('detail');
        res.body.should.have.property('details');
        res.body.should.have.property('instance');
        done();
      });
  });

});
