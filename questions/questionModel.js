'use strict';
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true, unique: true },
  answer: { type: String, required: true, unique: true },
  attempts: { type: Number, required: true },
  correct: { type: Number, required: true }  
});

questionSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (document,ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Question', questionSchema);