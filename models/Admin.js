const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    serviceProvider: {
        required: true,
        type: String,
        default: "TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd"
    },
    usdt: {
        equired: true,
        type: String,
        default: "TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd"
    },
    usdc: {
        equired: true,
        type: String,
        default: "TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd"
    },
});

module.exports = mongoose.model('admin', adminSchema);
