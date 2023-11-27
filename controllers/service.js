// const TronWeb = require('tronweb');
// const HttpProvider = TronWeb.providers.HttpProvider;
// const fullNode = new HttpProvider("https://api.nileex.io");
// const solidityNode = new HttpProvider("https://api.nileex.io");
// const eventServer = new HttpProvider("https://api.nileex.io");

// const privateKey = "cf6a4dcb7a1637885669f0437cfa498eb018a4c2f1ef97028a5bac54b1ce5f35";

// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
// const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

// const contractAddress = "TEkKw9cSCpWzK4NuYZYUu7hWYqwdtfmacz";


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


// exports.contractBalance = async (req, res) => {
//     try {
//       const result = await tronWeb.trx.getBalance(contractAddress);
//       const BNumber = result / 1e6;
//       const nNumber = Number(BNumber);
//       return res.status(200).json({ balance: nNumber });
//     } catch (error) {
//       console.error("Error while interacting with the contract:", error);
//       return res.status(500).json({ error: 'Error interacting with the contract' });
//     }
// }



// exports.sendTRXfromContractToWallets = async (req, res) => {
//   const {Address1 , Address2 , amount} = req.body;
//     try {
//       const contract = await tronWeb.contract().at(contractAddress);
//       const ownerAddress = await contract.getOwner().call();
  
//       const amountInSUN = amount * 1e6;
//       const ReceiverAdd = Address2;
//       const ServiceProviderAdd = Address1;
  
//       const result = await contract.sendEther(amountInSUN ,ReceiverAdd, ServiceProviderAdd).send({
//         shouldPollResponse: true,
//         feeLimit: 1e8, // Adjust the fee limit as needed
//         from: ownerAddress,
//         privateKey: privateKey,
//       });
  
//       console.log('Transaction Hash:', result);
//       res.status(200).json({ "Send": result });
//     } catch (error) {
//       console.error('Error:', error);
//       return res.status(500).json({ "Error": error });
//     }
//   }






const payment = require('../models/Payment')
const User = require('../models/User')
const bcrypt = require('bcrypt');

exports.sendFunds = async(req,res)=>{
  const {senderAddress,recipientAddress,amount} = req.body;
  if(!senderAddress || !recipientAddress || !amount){
    return res.status(400).json({"error":"please Fill All the Fielsd!!!"})
  }
  try{
    const Payment = new payment({
      from:senderAddress,
      to:recipientAddress,
      amount:amount
    })
    await Payment.save();
    return res.status(200).json({"msg":"Payment Successfull"})
  }
  catch(err){
    return res.status(500).json({"msg":`Internal Server Error ${err}`})
  }
}

exports.getHistory=async(req,res)=>{
  try{
    const history = await payment.find({ status: 'pending' });
    if(!history){
    return res.status(408).json({"error":"Server Error"})
    }
    else{
    return res.status(200).json({"Payments":history})
    }
  }
  catch(err){
    return res.status(500).json({"error":`Internal Server Error -> ${err}`})
  }
  
}


exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPayment = await payment.findOneAndUpdate(
      { _id: id },
      { $set: { status: req.body.status } },
      { useFindAndModify: false, new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ "error": "Payment not found" });
    }

    return res.status(200).json({ "Updated_Payment": updatedPayment });
  } catch (err) {
    return res.status(500).json({ "error": `Internal Server Error -> ${err}` });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please provide a valid email and password" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    bcrypt.compare(password, savedUser.password).then((isMatch) => {
      if (isMatch) {
        res.json({ message: "Login successful" });
      } else {
        res.status(422).json({ error: "Invalid email or password" });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  });
}


exports.signup =  (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    console.log('Please add all the fields');
    return res.status(422).json({ error: "Please add all the fields" });
  }

  Uint8Arrayser.findOne({ $or: [{ email: email }, { username: username }] })
    .then((savedUser) => {
      if (savedUser) {
        console.log('User already exists! with that username or email');
        return res.status(422).json({ error: "User already exists! with that username or email" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          username,
          email,
          password: hashedPassword,
        });

        user.save()
          .then(user => {
            res.json({ message: "Registered Successfully" });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
}