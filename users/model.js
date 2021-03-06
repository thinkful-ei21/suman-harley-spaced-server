'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: { type: String},
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  question: { type: Array, default: [] },
  current: { type: Number, default: 0 }
});

userSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (document, ret) => {
    delete ret._id;
    delete ret.password;
  }
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);