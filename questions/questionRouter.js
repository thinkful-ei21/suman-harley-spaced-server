'use strict';

const express = require('express');
const passport = require('passport');

const Question = require('../question/questionModel');
const router = express.Router();

router.use(
  passport.authenticate('jwt', {session:false, failWithError: true})
);

router.get('/', (req,res) => {
  
});

module.exports = router;