const mongoose = require("mongoose");

const sendEmailSchema = mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = sendEmailSchema;
