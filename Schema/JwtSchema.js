const mongoose = require("mongoose");

const jwtSchema = mongoose.Schema({
    success: {
        type: Boolean,
        required: true,
      },
});

module.exports = jwtSchema;