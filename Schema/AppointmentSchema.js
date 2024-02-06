const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorCode: {
    type: String,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  meetingId: {
    type: String,
    required: true,
  },
  fee:{
    type: Number,
    required: true,
  }
});

module.exports = appointmentSchema;
