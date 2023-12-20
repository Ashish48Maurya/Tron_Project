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
        console.log("Decoded Token: ", isVerified);

        const userData = await User.findOne({ username: isVerified.username }).select({
            password: 0,
        });

        console.log("Decoded Token: ", isVerified);
        console.log("User Data: ", userData);

        if (!userData) {
            return res.status(401).json({ message: "Unauthorized, User not found" });
        }

        req.User = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = authMiddleware;