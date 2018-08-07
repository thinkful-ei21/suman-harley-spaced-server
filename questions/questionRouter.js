'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwtDecode = require('jwt-decode');

const Question = require('./questionModel');
const User = require('../users/model');

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
  console.log(username);
  User.findOne({ username })
    .then(result => {
      if (result) {
        res.json(result.question[0]);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;