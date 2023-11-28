const express = require('express');
const app = express();
const port = 8000;
const qrcode = require('qrcode');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routers');
const mongoConnect = require('./db');

app.use(express.json());
app.use(cors());
app.use(routes);

// app.post('/generate-qr', (req, res) => {
//   const toAddress = req.body.toAddress;
//   const amount = (req.body.amount) * 1e6;
//   const qrCodeData = `bitcoin:${toAddress}?amount=${amount}`;

//   qrcode.toFile(
//     path.join(__dirname, '/Frontend', '/public', '/images', `${toAddress}qrcode.png`),
//     // path.join(__dirname, '/Frontend', '/public', '/images', `qrcode.png`),
//     qrCodeData,
//     (err) => {
//       if (err) {
//         res.status(500).send('Error generating QR code');
//       } else {
//         res.status(200).send('QR code generated and saved in the public directory');
//       }
//     }
//   );
// });

mongoConnect("mongodb+srv://Ashish:Ashishmaurya102938@cluster1.f21bdyh.mongodb.net/TronProject").then(() => {

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});