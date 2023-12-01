import { useLocation , Link } from 'react-router-dom';
import {Web3} from 'web3'
export default function QrCode() {
  const location = useLocation();
  const { amt, add, src } = location.state;
  console.log(location.state)

  const serviceProviderWalletAddress = "TPhjcXiHnF4oc7cdPmC5VyFqi99gDTCU4z"

  const openTronLinkWallet = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      const toAddress = add;
      const amount = amt * 1e6;

      try {
        const Res = await window.tronWeb.trx.sendTransaction(serviceProviderWalletAddress, amount);

        if (Res.result) {
          const transactionId = await Res.transaction.txID;

              const transactionReceipt = await window.tronWeb.trx.getTransactionInfo(transactionId);
              console.log("Trans: ",transactionReceipt);

          // const blockHash = transactionReceipt.blockHash;
          // const fee = transactionReceipt.fee;


          const transactionDetails = {
            timestamp: new Date(),
            senderAddress: window.tronWeb.defaultAddress.base58,
            recipientAddress: toAddress,
            amount: amt
          };
          console.log(transactionDetails);
          const {senderAddress , recipientAddress, amount} = transactionDetails;
          const res = await fetch("http://localhost:8000/sender_to_serviceProvider",{
            method : "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              senderAddress,recipientAddress,amount
            })
          })

          const data = await res.json();

          if(res.status === 404 || res.status === 400 || !data){
            window.alert("Invalid Entry");
          }
          else{
          window.alert("Funds Added Successfully!!!");
          }
        }
        else {
          window.alert("Transaction Fail: ",Res.result.message);
        }
      }
      catch (error) {
        window.alert(`Error sending transaction: ${error}`);
      }
    } else {
      alert('Please install and log in to TronLink wallet to initiate the transaction.');
    }
  };


  const openMetamaskWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
  
        const fromAddress = accounts[0];
        const transaction = {
          from: fromAddress,
          to: '0x6f1DF96865D09d21e8f3f9a7fbA3b17A11c7C53C',
          value: '0x1'
        };
  
        const receipt = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transaction]
        });
  
        console.log("Transaction Receipt:", receipt);
  
      } else {
        alert('Please install and log in to MetaMask wallet to initiate the transaction.');
      }
    } catch (error) {
      window.alert(`Error sending transaction: ${error.message}`);
    }
  };
  

  return (
    <>
      <p>Amount to be sent : {amt}TRX</p>
      <p>Sender's Account : {add}</p>
      <h1><span>S</span>can and <span>P</span>ay</h1>
      <div><img src={src} alt="qrcode" /></div>
      <strong>OR</strong>
      <br />
      <button onClick={openTronLinkWallet}>Pay Using Tronlink</button>
      <button onClick={openMetamaskWallet}>Pay Using Tronlink</button>
    </>
  )
}