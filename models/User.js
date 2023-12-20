// user.model.js
const mongoose = require('mongoose');
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
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Msg',
    }],
});

<<<<<<< HEAD
userSchema.methods.generateToken = async function () {
    console.log("I am token");
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
=======
const User = mongoose.model('User', userSchema);
>>>>>>> d3ec3f498b8f952f0b9651cb45e543a5b0efc335
module.exports = User;
