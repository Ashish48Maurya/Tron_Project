const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const qrcode = require('qrcode');
const ABI = require('./ABI.json');
const cors = require('cors');
const routes = require('./routes/routers')
const path = require('path');

app.use(express.json());
app.use(cors())
app.use(routes);

app.post('/generate-qr', (req, res) => {
  const toAddress = req.body.toAddress;
  const amount = req.body.amount;
  const qrCodeData = `bitcoin:${toAddress}?amount=${amount}`;

  qrcode.toFile(
    path.join(__dirname, '/Frontend' , '/src', '/images', 'qrcode.png'),
    qrCodeData,
    (err) => {
      if (err) {
        res.status(500).send('Error generating QR code');
      } else {
        res.status(200).send('QR code generated and saved in the public directory');
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});