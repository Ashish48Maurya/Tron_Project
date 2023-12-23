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
        default: "TGQVLckg1gDZS5wUwPTrPgRG4U8MKC4jcP"
    },
    usdc: {
        equired: true,
        type: String,
        default: "TMaasBDjFc6sSBK38mb6eqNosYkgwAHqKe"
    },
});

module.exports = mongoose.model('admin', adminSchema);
