const express = require('express');
const router = express.Router();
const service = require('../controllers/service');

// router.post('/sendToContract', service.sendToContract);

// router.get('/contract_balance', service.contractBalance);

// router.post('/send_to_wallets', service.sendTRXfromContractToWallets);
router.post('/sender_to_serviceProvider', service.sendFunds);
router.get('/payment_history_serviceProvider', service.getHistory);
router.put('/update_payment_serviceProvider/:id', service.updatePayment)
router.post('/register', service.signup)
router.post('/signin', service.signin)
router.post('/forgotpassword', service.forgotpassword)
router.put('/verify/:id', service.verify)
// router.get('/createPost', service.requireLogin, (req, res) => {
//     console.log("hello auth")
// })
// router.get('/username', service.username)
// router.get('/phrase', service.phrase)

module.exports = router;