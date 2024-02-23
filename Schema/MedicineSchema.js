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

const medicineSchema = mongoose.Schema({
<<<<<<< HEAD
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
    address: {
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
    medicines: [
        medicineSubSchema
    ],
    meetingId:{
        type: String,
        required: true
    }
=======
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
  age: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  medicines: [medicineSubSchema],
  meetingId: {
    type: String,
    required: true,
  },
>>>>>>> 0980b7aecdba6119308dbf0607e99e87f4d1f398
});

module.exports = medicineSchema;
