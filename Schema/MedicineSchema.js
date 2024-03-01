const mongoose = require("mongoose");

const medicineSubSchema = mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
});

const investigationSubSchema = mongoose.Schema({
  investigationName: {
    type: String,
    required: false,
  },
});

const medicineSchema = mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  // address: {
  //   type: String,
  //   required: true,
  // },
  fee: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  investigations: [investigationSubSchema],
  medicines: [medicineSubSchema],
  meetingId: {
    type: String,
    required: true,
  },
  degrees: [
    {
      type: String,
      required: true,
    },
  ],
  specialties:{
    type: String,
    required: true,
  },
  feedback:{
    type: String,
    required: false
  }
});

module.exports = medicineSchema;
