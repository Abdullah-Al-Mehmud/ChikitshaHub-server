const mongoose = require("mongoose");

const DoctorLiveReqSchema = mongoose.Schema({
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
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  liveId: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = DoctorLiveReqSchema;
