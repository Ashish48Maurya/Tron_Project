const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const qrcode = require('qrcode');
const ABI = require('./ABI.json');
const cors = require('cors');
const routes = require('./routes/routers')
const path = require('path');
const mongoConnect = require('./db');

app.use(express.json());
app.use(cors())
app.use(routes);

const count = 1;

app.post('/generate-qr', (req, res) => {
  const toAddress = req.body.toAddress;
  const amount = (req.body.amount)*1e6;
  const qrCodeData = `bitcoin:${toAddress}?amount=${amount}`;

  qrcode.toFile(
    path.join(__dirname, '/Frontend' , '/public', '/images', `${toAddress}${amount}qrcode.png`),
    // path.join(__dirname, '/Frontend', '/public', '/images', `qrcode.png`),
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


mongoConnect("mongodb://localhost:27017/Tron_Project").then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}).catch("Server Error");