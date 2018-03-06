process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const User = require('./../app/models/user');
const Messages = require('./../app/models/message');
chai.use(chaiHttp);

describe('Tests of Messages', () => {

  let saitama = {};
  let boros = {};
  let genos = {};

  beforeEach(async () => {
    let messages = await Messages.find({});
    if (messages) {
      messages.forEach(async message => await message.remove())
    }
    let users = await User.find({});
    if (users) {
      users.forEach(async user => user.remove());
    }
    boros = await new User({name: "Boros", username: "boros"}).save();
    saitama = await new User({name: "Saitama", username: "saitama"}).save();
    genos = await new User({name: "Genos", username: "genos", budget: 0}).save();
  });

  afterEach(async () => {
    let messages = await Messages.find({});
    if (messages) {
      messages.forEach(async message => await message.remove())
    }
    let users = await User.find({});
    if (users) {
      users.forEach(async user => user.remove());
    }
  });

  it('Should not create new message, user not found', (done) => {
    //invalid username
    let user = {
      "to": "5a9d91fe1e12d2306e118d42",
      "from": "5a9d9a2fa30a62641ec86c30",
      "body": "Olá"
    };
    chai.request(server)
      .post('/messages')
      .send(user)
      .end((error, res) => {
        res.should.have.status(404);
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

  it('Should not create new message, invalid body min length', (done) => {
    //invalid username
    let user = {
      "to": boros._id,
      "from": saitama._id,
      "body": ""
    };

    chai.request(server).post('/messages').send(user)
      .send(user)
      .end((err, res) => {
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

  it('Should not create new message, invalid body max length', (done) => {
    //invalid username
    let user = {
      "to": boros._id,
      "from": saitama._id,
      "body": "Primeiro eu queria cumprimentar os internautas. " +
      "-Oi Internautas! Depois dizer que o meio ambiente é sem dúvida " +
      "nenhuma uma ameaça ao desenvolvimento sustentável. E isso significa que é " +
      "uma ameaça pro futuro do nosso planeta e dos nossos países. " +
      "O desemprego beira 20%, ou seja, 1 em cada 4 portugueses." +
      "Eu dou dinheiro pra minha filha. " +
      "Eu dou dinheiro pra ela viajar, então é... é... Já vivi muito sem dinheiro, " +
      "já vivi muito com dinheiro. -Jornalista: Coloca esse dinheiro na poupança" +
      " que a senhora ganha R$10 mil por mês. -Dilma: O que que é R$10 mil?"
    };

    chai.request(server).post('/messages').send(user)
      .send(user)
      .end((err, res) => {
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

  it('Should not create new message, genos not budget', (done) => {
    //invalid username
    let user = {
      "from": boros._id,
      "to": genos._id,
      "body": "vou conseguir a vaga!"
    };

    chai.request(server).post('/messages').send(user)
      .send(user)
      .end((err, res) => {
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

  it('Should create new message', (done) => {
    //invalid username
    let user = {
      "to": boros._id,
      "from": saitama._id,
      "body": "vou conseguir a vaga!"
    };

    chai.request(server).post('/messages').send(user)
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('from');
        res.body.should.have.property('to');
        res.body.should.have.property('body');
        res.body.should.have.property('sentAt');
        done();
      });
  });


});
