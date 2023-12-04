require('dotenv').config()
const express = require('express');
const app = express();
const port = 8000;
const routes = require('./routes/routers');
const mongoConnect = require('./db');
const { generateUsername } = require("unique-username-generator");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.get('/username', (req, res) => {
  const username = generateUsername();
  return res.status(200).json({ username });
})

mongoConnect(process.env.MONGO_URL).then(() => {

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});