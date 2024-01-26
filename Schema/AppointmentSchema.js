const mongoose = require("mongoose");

// doctorName: doctor.name, doctorCode: doctor.doctorCode, passantName: displayName, passantEmail: email, appointmentTime: appointment

const appointmentSchema = mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorCode: {
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
});

module.exports = appointmentSchema;
