import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

export default function Payment() {

  const [iAmt, setAmt] = useState('');
  const [iAdd, setAdd] = useState('');
  const navigate = useNavigate();

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
      
    }
    else {
      navigate('/qrCode');
    }
  }

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
          <button onClick={generateQRCode}>Continue</button>
        </div>
      </div>
    </>
  );
}

