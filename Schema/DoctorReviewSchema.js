const mongoose = require("mongoose");

const doctorReviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
});

module.exports = doctorReviewSchema;
