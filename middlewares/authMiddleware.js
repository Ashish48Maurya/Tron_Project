const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace(/^Bearer\s/, "").trim();
    console.log("Token from middleware ", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log(isVerified);

        // const userData = await User.findOne({ _id: isVerified._id }).select({
        //     password: 0,
        // });
        const userData = await User.findOne({_id: isVerified._id })
            

        if (!userData) {
            console.log( "User not found")
            return res.status(401).json({ message: "User not found" });
        }

        req.User = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = authMiddleware;
