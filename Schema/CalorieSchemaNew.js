const mongoose = require("mongoose");

const CalorieSchemaNew = mongoose.Schema({
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
  calories: {
    type: String,
    required: true,
  },
  healthStatus: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

module.exports = CalorieSchemaNew;