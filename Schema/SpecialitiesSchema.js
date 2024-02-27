const mongoose = require("mongoose");

const SpecialitiesSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  specialties: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = SpecialitiesSchema;
