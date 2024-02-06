const mongoose = require('mongoose');

const stripeSchema = mongoose.Schema({
    fee: {
        type: Number,
        required: true,
    },

});



module.exports = stripeSchema;