const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    from: {
        required: true,
        type: String,
    },
    to: {
        required: true,
        type: String,
    },
    amount: {
        required: true,
        type: Number,
    },
    asset:{
        required: true,
        type: String,
    },
    txID:{
        required: true,
        type: String,
    },
    timestamps: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed'],
    },
});

module.exports = mongoose.model('payment', paymentSchema);
