process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../app/models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);
