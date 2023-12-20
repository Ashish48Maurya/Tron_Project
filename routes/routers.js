const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/sender_to_serviceProvider', service.sendFunds);
router.get('/payment_history_serviceProvider', service.getHistory);
router.put('/update_payment_serviceProvider/:id', service.updatePayment)
router.post('/register', service.signup)
router.post('/signin', service.signin)
router.post('/contact', service.sendMsg)
router.post('/forgotpassword', service.forgotpassword)
router.put('/verify/:id', service.verify)
router.get('/user',authMiddleware,service.user)
// router.get('/createPost', service.requireLogin, (req, res) => {
//     console.log("hello auth")
// })
// router.get('/username', service.username)
// router.get('/phrase', service.phrase)

module.exports = router;