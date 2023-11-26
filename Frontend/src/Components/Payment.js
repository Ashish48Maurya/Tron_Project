import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataContext = React.createContext({
  amt: "",
  add: "",
});
//pata nahi kya hora bhai yaha
export default function Payment() {
  const navigate = useNavigate();
  const [amt, setAmt] = useState('');
  const [add, setAdd] = useState('');

  const generateQRCode = async () => {
    const data = {
      toAddress: add,
      amount: amt
    };

    const res = await fetch('http://localhost:8000/generate-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

      if (res.status === 500) {
        window.alert('Server Error');
        return;
      } else {
        navigate('/qrCode', { state: { amt, add } });
      }
  };

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
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
            />
          </div>
          <div className="address">
            <label htmlFor="address">Enter Receiver's Wallet address: </label>
            <input
              id="address"
              placeholder="wallet address"
              value={add}
              onChange={(e) => setAdd(e.target.value)}
            />
          </div>
          <button onClick={generateQRCode}>Continue</button>
        </div>
      </div>
    </>
  );
}
