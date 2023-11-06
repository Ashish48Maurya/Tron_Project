const express = require('express');
const app = express();
const port = 8000;
const ABI = require('./ABI.json');
const routes = require('./routes/routers')

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});