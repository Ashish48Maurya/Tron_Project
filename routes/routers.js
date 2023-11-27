const express = require('express');
const router = express.Router();
const service = require('../controllers/service');

// router.post('/sendToContract', service.sendToContract);

// router.get('/contract_balance', service.contractBalance);

// router.post('/send_to_wallets', service.sendTRXfromContractToWallets);
router.post('/sender_to_serviceProvider', service.sendFunds);
router.get('/payment_history_serviceProvider', service.getHistory);
router.put('/update_payment_serviceProvider/:id',service.updatePayment)
router.post('/signup',service.signIn)
router.post('/signin',service.logIn)
module.exports = router;