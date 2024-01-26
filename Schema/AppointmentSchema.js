const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    doctorCode: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    appointmentTime: {
        type: Date,
        required: true
    },
});

module.exports = appointmentSchema;