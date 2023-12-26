// user.model.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

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
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Msg',
    }],
    payments: [{
        type: Schema.Types.ObjectId,
        ref: 'payment',
    }],
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                username: this.username,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error("Token Error: ", error);
    }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
