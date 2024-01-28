const express = require('express');
const app = express();
const port = 8000;
const routes = require('./routes/routers');
const mongoConnect = require('./db');
const { generateUsername } = require("unique-username-generator");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const pvk = process.env.PRIVATE_KEY


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

app.get('/sendtxn', async (req, res) => {
  try {
    const { recipientAddress, asset, amount,usdt,usdc } = req.query;
    
    // const ans = await tronWeb.trx.sendTransaction("TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd", 1000, pvk);
    let Res;
        if (asset === 'TRX') {
          const amt = amount * 1e6 - (amount * 1e6)*0.01;
          Res = await tronWeb.trx.sendTransaction(recipientAddress, amt,pvk);
        }
        else if (asset === 'USDT') {
          const functionSelector = 'transfer(address,uint256)';
          const parameter = [{ type: 'address', value: recipientAddress }, { type: 'uint256', value: amount * 1e6 - (amount * 1e6)*0.01 }]
          const tx = await tronWeb.transactionBuilder.triggerSmartContract(usdt, functionSelector, {}, parameter);
          const signedTx = await tronWeb.trx.sign(tx.transaction);
          Res = await tronWeb.trx.sendRawTransaction(signedTx);
        }
        else { //if asset type is usdc/usdd
          const functionSelector = 'transfer(address,uint256)';
          const parameter = [{ type: 'address', value: recipientAddress }, { type: 'uint256', value: amount * 1e9 - (amount * 1e9)*0.01 }]//amt*1e18
          const tx = await tronWeb.transactionBuilder.triggerSmartContract(usdc, functionSelector, {}, parameter);
          const signedTx = await tronWeb.trx.sign(tx.transaction);
          Res = await tronWeb.trx.sendRawTransaction(signedTx);
        }
    
    console.log("Transaction response:", Res);
    return res.status(200).json({ msg: Res });
  } catch (error) {
    console.error('Error:', error);
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