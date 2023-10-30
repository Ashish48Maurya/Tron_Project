const express = require('express');
const app = express();
const port = 8000;
const TronWeb = require('tronweb');
const ABI = require('./ABI.json');
const HttpProvider = TronWeb.providers.HttpProvider;

// Initialize TronWeb with appropriate configurations
const fullNode = new HttpProvider("https://api.nileex.io");
const solidityNode = new HttpProvider("https://api.nileex.io");
const eventServer = new HttpProvider("https://api.nileex.io");
const privateKey = "cf6a4dcb7a1637885669f0437cfa498eb018a4c2f1ef97028a5bac54b1ce5f35";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const contractAddress = "TJJJfxtrceZV2rDVcpCRh6izEHQeJibw2S";
const contract =  tronWeb.contract(ABI, contractAddress);

async function initializeContract() {
    try {
      const result = await contract.methods.getNumber().call();
      const nNumber = Number(result);
      console.log("Result:", nNumber);
    } catch (error) {
      console.error("Error while interacting with the contract:", error);
    }
  }
  
app.get('/', (req, res) => {
  res.send('<h1>Apna Kaam Karo Idhar Kya Kar Rahe Ho</h1>');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  initializeContract(); // Initialize the contract after the server starts
});