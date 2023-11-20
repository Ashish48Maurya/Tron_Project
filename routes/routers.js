const express = require('express');
const router = express.Router();
const service = require('../controllers/service');

// router.post('/sendToContract', service.sendToContract);

router.get('/contract_balance', service.contractBalance);

router.post('/send_to_wallets', service.sendTRXfromContractToWallets);

module.exports = router;