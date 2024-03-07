const mongoose = require("mongoose");

const BodyFitNewSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = BodyFitNewSchema;