import React, { useState } from 'react';

export default function Payment() {

  const [iAmt, setAmt] = useState('');
  const [iAdd, setAdd] = useState('');


  const generateQRCode = async () => {
    const data = {
      toAddress: iAdd,
      amount: iAmt
    }

    const res = await fetch("http://localhost:8000/generate-qr", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status === 500) {
      window.alert("QR Code Not Generated");
    }
    else {
      window.alert("QR Code Generated and Saved");
    }
  }

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
      <div className="box">
        <div className="head-1">
          <h2>Crypto Payments</h2>
        </div>
        <div className="htmlForm">
          <h3>Merchant Dashboard</h3>
          <div className="amount">
            <label htmlFor="amount">Enter Amount:</label>
            <input
              id="amount"
              placeholder="amount"
              value={iAmt}
              onChange={(e) => setAmt(e.target.value)}
            />
          </div>
          <div className="address">
            <label htmlFor="address">Enter Wallet Address:</label>
            <input
              id="address"
              placeholder="wallet address"
              value={iAdd}
              onChange={(e) => setAdd(e.target.value)}
            />
          </div>
          <button onClick={generateQRCode}>Generate</button>
        </div>
      </div>
    </>
  );
}

