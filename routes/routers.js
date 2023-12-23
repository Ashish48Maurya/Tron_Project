const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/payment_history_serviceProvider',authMiddleware, service.history);
router.put(`/update_payment_serviceProvider/:id`, service.updatePayment)
router.get(`/history_serviceProvider`,authMiddleware, service.getHistory)
router.post('/register', service.signup)
router.post('/signin', service.signin)
router.post('/forgotpassword', service.forgotpassword)
router.put('/verify/:id', service.verify)
router.get('/count', service.countUsers)
router.post('/contact',authMiddleware,service.sendMsg)
router.post('/sender_to_serviceProvider',authMiddleware, service.sendFunds);
router.get('/user',authMiddleware,service.user)


module.exports = router;