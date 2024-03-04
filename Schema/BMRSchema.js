const mongoose = require("mongoose");

const BMRSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
 
  bmr: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

module.exports = BMRSchema;