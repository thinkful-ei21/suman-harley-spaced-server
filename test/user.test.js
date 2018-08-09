'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const express = require('express');
const seedUsers = require('../db/seed/Users');
const seedQuestions = require('../db/seed/Question');
const Users = require('../users/model');
const Questions = require('../questions/questionModel');
const { app } = require('../index');
const jwt = require('jsonwebtoken');

const {JWT_SECRET,TEST_DATABASE_URL} = require('../config');
const {dbConnect, dbDisconnect} = require('../db-mongoose');
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
const expect = chai.expect;

describe.skip('HINGLISH', function () {
  const username = 'exampleUser';
  const password = 'examplePass';
  const fullname = 'Example User';

  before(function () {
    return dbConnect(TEST_DATABASE_URL)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  let token; 
  let user;

  beforeEach(function () {
    return Promise.all([
      Users.insertMany(seedUsers),
      Users.createIndexes(),
      Questions.insertMany(seedQuestions)])
      .then(([users]) => {
        user = users[0];
        token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('/api/users', function () {
    describe('POST', function () {
      it('Should create a new user', function () {
        const testUser = { username, password};
        let res;
        return chai
          .request(app)

          .post('/api/users')
          .send(testUser)
          .then(_res => {
            console.log(_res);
            res = _res;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys('question', 'username', 'current','id');

            expect(res.body.id).to.exist;
            //expect(res.body.username).to.equal(testUser.username);            

            return Users.findOne({ username });
          }).then(isValid => {
            expect(isValid).to.be.true;
          });
     
      });
    });



  });
  
});