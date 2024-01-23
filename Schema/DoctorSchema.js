const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = doctorSchema;
