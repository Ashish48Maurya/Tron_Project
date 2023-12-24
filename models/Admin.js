const mongoose = require('mongoose');

const serviceProviderEnum = [
    "TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd",
    "TNpz9dM1xScWzkeTSA9WrC9QHNuonX542s",
    "TWKPv4LnDxkq24JBJnzoFNk5J8zkkZf43c",
];

const adminSchema = new mongoose.Schema({
    serviceProvider: {
        required: true,
        type: String,
        default: "TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd",
        enum: serviceProviderEnum
    },
    usdt: {
        required: true,
        type: String,
        default: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"
    },
    usdc: {
        required: true,
        type: String,
        default: "TGjgvdTWWrybVLaVeFqSyVqJQWjxqRYbaK"
    }
});

module.exports = mongoose.model('admin', adminSchema);
