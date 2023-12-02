const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.requireLogin = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
        req.user = decoded; // Attach user information to the request object
        next();
    });
};
