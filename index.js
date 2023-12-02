const express = require('express');
const app = express();
const port = 8000;
const qrcode = require('qrcode');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routers');
const mongoConnect = require('./db');
const { generateUsername } = require("unique-username-generator");



app.use(express.json());
app.use(cors());
app.use(routes);


app.get('/username', (req, res) => {
  const username = generateUsername();
  return res.status(200).json({ username });
})

mongoConnect("mongodb+srv://Ashish:Ashishmaurya102938@cluster1.f21bdyh.mongodb.net/TronProject").then(() => {

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});