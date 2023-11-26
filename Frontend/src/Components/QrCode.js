import React , {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

export default function QrCode() {
  const location = useLocation();
  const { amt, add } = location.state || {};

  const serviceProviderWalletAddress = "TPhjcXiHnF4oc7cdPmC5VyFqi99gDTCU4z";
  
  const ReceiversAdd = add;

  const openTronLinkWallet = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      const toAddress = ReceiversAdd;
      const amount = amt;

      try {
        const Res = await window.tronWeb.trx.sendTransaction(serviceProviderWalletAddress, amount);

        if (Res.result) {
          const transactionId = Res.result.transactionId;

          // const transactionReceipt = await window.tronWeb.trx.getTransactionInfo(transactionId);
          // console.log(transactionReceipt);
          // const blockHash = transactionReceipt.blockHash;
          // const fee = transactionReceipt.fee;

          

          const transactionDetails = {
            timestamp: new Date(),
            senderAddress: window.tronWeb.defaultAddress.base58,
            recipientAddress: toAddress,
            amount,
            // blockHash,
            // fee
          };
          console.log(transactionDetails);

          window.alert("Funds Added Successfully!!!");
        } else {
          console.error('Error sending transaction:', Res.result.message);
          window.alert("Transaction Fail");
        }
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      alert('Please install and log in to TronLink wallet to initiate the transaction.');
    }
  };


  return (
    <>
      <h1><span>S</span>can and <span>P</span>ay</h1>
      <div><img src="images/qrcode.png" alt="" /></div>
      <strong>OR</strong>
      <br />
      <p>{`Input 1: ${amt}`}</p>
      <p>{`Input 2: ${add}`}</p>
      <button onClick={openTronLinkWallet}>Pay Using Tronlink</button>
    </>
  )
}