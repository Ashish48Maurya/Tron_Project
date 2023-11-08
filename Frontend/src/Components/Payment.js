<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
>>>>>>> 10a7b6873d539c4e83c5833aa10bfd65ff0cb6a9

function Payment() {
  const [iAmt, setAmt] = useState('');
  const [iAdd, setAdd] = useState('');

<<<<<<< HEAD
  const generateQRCode=async ()=>{
    const data = {
      toAddress : iAdd,
      amount : iAmt
    }

    const res = await fetch("http://localhost:8000/generate-qr", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(res.status === 500){
      window.alert("QR Code Not Generated");
    }
    else{
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
          {/* <div id="qr-code">
            {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
          </div> */}
          <button onClick={generateQRCode}>Generate</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
=======
    useEffect(() => {
        notify("Logged In To The Wallet before Doing Any Transaction");
    }, [])

    const [iAmt, setAmt] = useState("");
    const [iAdd, setAdd] = useState("");

    const notify = (msg) => toast.info(msg);

    const openTronLinkWallet = async () => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            const toAddress = iAdd;
            const amount = iAmt * 1e6;

            try {
                await window.tronWeb.trx.sendTransaction(toAddress, amount);
                notify("Funds Added Successfully!!!")
            } catch (error) {
                console.error('Error sending transaction:', error);
            }
        } else {
            alert('Please install and log in to TronLink wallet to initiate the transaction.');
        }
    };

    return (
        <>
            <div className='box'>
                <div className='head-1'>
                    <h2>Crypto Payments</h2>
                </div>
                <div className='htmlForm'>
                    <h3>Merchant Dashboard</h3>

                    <div className="chain">
                        <label for="chain">Choose a Chain:</label>
                        <select id="chain" name="chain">
                            <option value="eth">ETH</option>
                        </select>
                    </div>

                    <div className="asset">
                        <label for="asset">Payment Asset Type:</label>
                        <select id="asset" name="asset">
                            <option value="eth">TRX</option>
                            <option value="usdc">USDC</option>
                            <option value="usdt">USDT</option>
                            <option value="eth">ETH</option>
                            <option value="btc">BTC</option>
                        </select>
                    </div>

                    <div className="amount">
                        <label for="amount">Enter Amount:</label>
                        <input id="amount" placeholder="amount" />
                    </div>

                    <div className="address">
                        <label for="address">Enter Wallet Address:</label>
                        <input id="address" placeholder="wallet address" />
                    </div>

                    <button onClick={openTronLinkWallet}>Generate</button>
                </div>
            </div>
        </>
    );
}

export default Payment
>>>>>>> 10a7b6873d539c4e83c5833aa10bfd65ff0cb6a9
