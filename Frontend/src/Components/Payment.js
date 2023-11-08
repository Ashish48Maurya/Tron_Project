import React, { useEffect, useState } from 'react';


function Payment() {
const [iAmt, setAmt] = useState("");
const [iAdd, setAdd] = useState("");

const QRCode = require('qrcode');
const toAddress = iAdd; 
const amount = iAmt * 1e6;

const generateQRCode = async () => {
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    const tronWeb = window.tronWeb;
    
    try {
      const data = {
        toAddress,
        amount
      };
      
      const qrCodeText = JSON.stringify(data);
      
      QRCode.toDataURL(qrCodeText, (err, url) => {
        if (err) {
          console.error('Error generating QR code:', err);
        } else {
          console.log(url);
        }
      });
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  } else {
    alert('Please install and log in to TronLink wallet to initiate the transaction.');
  }
};


  // const openTronLinkWallet = async () => {
  //   if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
  //     const toAddress = iAdd; 
  //     const amount = iAmt*1e6;

  //     try {
  //       await window.tronWeb.trx.sendTransaction(toAddress, amount);
  //       window.alert("Funds Added Successfully!!!")
  //     } catch (error) {
  //       console.error('Error sending transaction:', error);
  //     }
  //   } else {
  //     alert('Please install and log in to TronLink wallet to initiate the transaction.');
  //   }
  // };

  return (
    <>
      <div className='box'>
        <div className='head-1'>
          <h2>Crypto Payments</h2>
        </div>
        <div className='htmlForm'>
          <h3>Merchant Dashboard</h3>

          <div className="amount">
            <label htmlFor="amount">Enter Amount:</label>
            <input id="amount" onChange={(e) => { setAmt(e.target.value) }} value={iAmt} placeholder="amount" />
          </div>

          <div className="address">
            <label htmlFor="address">Enter Receiver's Wallet Address:</label>
            <input id="address" placeholder="wallet address" onChange={(e) => { setAdd(e.target.value) }} value={iAdd} />
          </div>

          <button onClick={generateQRCode()}>Generate</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
