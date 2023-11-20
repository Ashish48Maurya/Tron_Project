const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.nileex.io");
const solidityNode = new HttpProvider("https://api.nileex.io");
const eventServer = new HttpProvider("https://api.nileex.io");

const privateKey = "cf6a4dcb7a1637885669f0437cfa498eb018a4c2f1ef97028a5bac54b1ce5f35";

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const contractAddress = "TEkKw9cSCpWzK4NuYZYUu7hWYqwdtfmacz";


// exports.sendToContract = async (req, res) => {
//     const amount = req.body.iAmt;
//     console.log(amount);
//     try {
//       if (!amount || isNaN(amount)) {
//         return res.status(400).json({ error: 'Invalid amount' });
//       }
  
//       const transaction = await tronWeb.transactionBuilder.sendTrx(
//         contractAddress,
//         amount * 1e6,
//         SendersAdd
//       );
  
//       const signedTransaction = await tronWeb.trx.sign(transaction, privateKey);
//       const receipt = await tronWeb.trx.sendRawTransaction(signedTransaction);
  
//       if (receipt.result) {
//         const confirmed = await tronWeb.trx.getTransaction(receipt.transaction.txID);
//         if (confirmed.ret[0].contractRet == "SUCCESS") {

//           return res.status(200).json({ message: 'Funds Added Successfully' });
//         } else {
//           return res.status(400).json({ error: 'Transaction failed' });
//         }
//       }
//       else {
//         return res.status(400).json({ error: 'Transaction failed' });
//       }
//     }
//     catch (error) {
//       console.error('Error:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   }


exports.contractBalance = async (req, res) => {
    try {
      const result = await tronWeb.trx.getBalance(contractAddress);
      const BNumber = result / 1e6;
      const nNumber = Number(BNumber);
      return res.status(200).json({ balance: nNumber });
    } catch (error) {
      console.error("Error while interacting with the contract:", error);
      return res.status(500).json({ error: 'Error interacting with the contract' });
    }
}



exports.sendTRXfromContractToWallets = async (req, res) => {
  const {Address1 , Address2 , amount} = req.body;
    try {
      const contract = await tronWeb.contract().at(contractAddress);
      const ownerAddress = await contract.getOwner().call();
  
      const amountInSUN = amount * 1e6;
      const ReceiverAdd = Address2;
      const ServiceProviderAdd = Address1;
  
      const result = await contract.sendEther(amountInSUN ,ReceiverAdd, ServiceProviderAdd).send({
        shouldPollResponse: true,
        feeLimit: 1e8, // Adjust the fee limit as needed
        from: ownerAddress,
        privateKey: privateKey,
      });
  
      console.log('Transaction Hash:', result);
      res.status(200).json({ "Send": result });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ "Error": error });
    }
  }