import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qrCode from 'qrcode';
export default function Payment() {
  const navigate = useNavigate();
  const [amt, setAmt] = useState('');
  const [add, setAdd] = useState('');
  const generateQRCode = async () => {
    if(!amt || !add){
      return window.alert("All Fields Are Required!");
    }
    const url = await qrCode.toDataURL(`tronlink://send?amount=${amt}&address=${add}`);
    navigate('/qrCode', { state: { amt, add, src: url } });
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
