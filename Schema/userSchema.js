const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  photoUrl: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
  phoneNumber: {
    type: Number,
    unique: false,
  },
  bloodGroup: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
