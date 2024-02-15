const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    patientName: {
        type: [String],
        required: true,
    },
    address: {
        type: [String],
        required: true,
    },
    age: {
        type: [String],
        required: true,
    },
    date: {
        type: [String],
        required: true,
    },
    medicineName: {
        type: String,
        required: true,
    },
    frequencies: {
        type: [String],
        required: true,
    },
    days: {
        type: String,
        required: true,
    }
});

module.exports = medicineSchema;