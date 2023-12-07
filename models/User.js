const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phrase: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;
