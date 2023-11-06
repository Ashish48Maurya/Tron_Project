const express = require('express');
const router = express.Router();
const service = require('../controllers/service');

router.post('/send_to_contract', service.sendToContract);

router.get('/contract_balance', service.contractBalance);

router.get('/send_to_wallets', service.sendTRXfromContractToWallets);

module.exports = router;