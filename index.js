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

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.nileex.io");
const solidityNode = new HttpProvider("https://api.nileex.io");
const eventServer = new HttpProvider("https://api.nileex.io");
const privateKey = '6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56';

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

app.get('/token', async (req, res) => {
  try {
    // for usdt,usdc put issuer wallet address
    const ans = await tronWeb.trx.getTokensIssuedByAddress("TJM1BE5wq1VdHh3gwjUeyaVkvZp9DVYCfC");
    // const ans = await tronWeb.trx.getTokensIssuedByAddress("TNpz9dM1xScWzkeTSA9WrC9QHNuonX542s");
    console.log("response: ", ans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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