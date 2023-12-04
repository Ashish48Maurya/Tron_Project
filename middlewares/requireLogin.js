const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middlewares/authMiddleware');

router.get('/protected-route', requireLogin, (req, res) => {
    // Accessible only if the user is authenticated
    res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;