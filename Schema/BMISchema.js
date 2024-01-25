const mongoose = require("mongoose");

const bmiSchema = mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bmiResult: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = bmiSchema;
