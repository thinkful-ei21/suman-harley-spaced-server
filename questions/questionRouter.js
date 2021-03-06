'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwtDecode = require('jwt-decode');

const User = require('../users/model');
const Question = require('./questionModel');
const updatedQuestions = require('./questionUpdate');

const router = express.Router();

router.use('/', passport.authenticate('jwt', {session:false, failWithError: true}));

router.get('/questions', (req, res, next) => {
  let decodedToken = '';
  if (req.headers.authorization) {
    decodedToken = jwtDecode(req.headers.authorization.slice(7));
  }
  let username = '';
  if (decodedToken.user) {
    username = decodedToken.user.username;
  }
  //console.log(username);
  User.findOne({ username })
    .then(result => {
      if (result) {
        let q = {
          question: result.question[result.current].question,
          attempts: result.question[result.current].attempts,
          correct: result.question[result.current].correct
        };
        res.json(q);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.put('/questions', (req, res, next) => {
  let decodedToken = '';
  if (req.headers.authorization) {
    decodedToken = jwtDecode(req.headers.authorization.slice(7));
  }
  let username = '';
  if (decodedToken.user) {
    username = decodedToken.user.username;
  }
  const { answer } = req.body;
  //console.log(username);
  User.findOne({ username })
    .then(result => {
      if (result) {
        //console.log(result);
        return Question.findOne({question: result.question[result.current].question})
          .then(q => {
            let payload = {};
            let gotIt = (q.answer === answer);
            payload = updatedQuestions(result.question, gotIt, result.current);
            payload.updatedQuestion = { 
              ...payload.updatedQuestion, 
              answer: q.answer,
              result: gotIt
              };
            console.log(username);
            return payload;
          });
      } else {
        next();
      }
    })
    .then(result => {
      //console.log(result.newQuestions);
      //console.log(Object.keys(result));
      //console.log(username);
      if (result) {
        //console.log(result.newQuestions);
        res.json(result.updatedQuestion);
        return User.findOneAndUpdate(
          {username},{$set: {
            question: result.newQuestions,
            current: result.newHead
          }}
        );
      } else {
        next();
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;