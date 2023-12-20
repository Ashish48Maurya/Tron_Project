const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

const Msg = mongoose.model("Msg", contactSchema);
module.exports = Msg;