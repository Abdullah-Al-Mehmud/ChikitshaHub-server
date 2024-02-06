const mongoose = require("mongoose");

// Define the award schema

// Define the education schema
const educationSchema = new mongoose.Schema({
  academy: { type: String, required: true },
  courseName: { type: String, required: true },
  session: { type: String, required: true },
});

// Define the experience schema
const experienceSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: String, required: true },
  year: { type: Number, required: true },
});

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },

  specialties: {
    type: String,
    required: true,
  },

  degrees: [
    {
      type: String,
      required: true,
    },
  ],
  doctorCode: {
    type: String,
    required: true,
  },
  bmdcNumber: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  followUpFee: {
    type: Number,
    required: true,
  },
  availability: [
    {
      type: String,
      required: true,
    },
  ],
  aboutDoctor: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  education: {
    type: educationSchema,
    required: true,
  },
  experience: {
    type: experienceSchema,
    required: true,
  },
});

module.exports = doctorSchema;
