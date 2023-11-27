import { useState } from 'react';
import { useLocation , Link } from 'react-router-dom';

export default function QrCode() {
  const location = useLocation();
  const { amt, add } = location.state;

  const serviceProviderWalletAddress = "TPhjcXiHnF4oc7cdPmC5VyFqi99gDTCU4z";

  const openTronLinkWallet = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      const toAddress = add;
      const amount = amt * 1e6;

      try {
        const Res = await window.tronWeb.trx.sendTransaction(serviceProviderWalletAddress, amount);

        if (Res.result) {
          // const transactionId = Res.result.transactionId;

          // const transactionReceipt = await window.tronWeb.trx.getTransactionInfo(transactionId);
          // console.log("Trans: ",transactionReceipt);

          // const blockHash = transactionReceipt.blockHash;
          // const fee = transactionReceipt.fee;


          const transactionDetails = {
            timestamp: new Date(),
            senderAddress: window.tronWeb.defaultAddress.base58,
            recipientAddress: toAddress,
            amount: amt
            // blockHash,
            // fee
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
          console.error('Error sending transaction:', Res.result.message);
          window.alert("Transaction Fail");
        }
      }
      catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      alert('Please install and log in to TronLink wallet to initiate the transaction.');
    }
  };


  return (
    <>
      <h1><span>S</span>can and <span>P</span>ay</h1>
      <div><img src={`images/${add}qrcode.png`} alt="qrcode" /></div>
      <strong>OR</strong>
      <br />
      <p>Data from Payment component:</p>
      <p>Amount to be sent : {amt}TRX</p>
      <p>Account to be send : {add}</p>
      <button onClick={openTronLinkWallet}>Pay Using Tronlink</button>
      <Link to='/payment'>Home</Link>
    </>
  )
}