import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import qrCode from 'qrcode';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const { token, address, usdtContractAddress, usddContractAddress } = useAuth();
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const navigate = useNavigate();
  const [amt, setAmt] = useState('');
  const [add, setAdd] = useState('');
  const [src, setSrc] = useState(null);
  const [ass, setAsset] = useState('USDT');
  const [error, setError] = useState('');
  const [id, setID] = useState(null)
  const [loading, setLoading] = useState(false);

  // router.put('/update_payment_serviceProvider/:id', service.updatePayment)
  const updatePayment = async (id) => {
    const ans = await fetch(`http://localhost:8000/update_payment_serviceProvider/${id}?status=completed`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (ans.ok) {
      const data = await ans.json();
      console.log("Response:", data);
      // notifyB("Funds Added Successfully!!!");
    } else {
      console.error('Error:', ans.statusText);
    }
  }






  const openTronLinkWallet = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      try {
        let Res;
        if (ass === 'TRX') {
          const amount = amt * 1e6;
          Res = await window.tronWeb.trx.sendTransaction(address, amount);
        }
        else if (ass === 'USDT') {

          const functionSelector = 'transfer(address,uint256)';
          const parameter = [{ type: 'address', value: address }, { type: 'uint256', value: amt * 1e6 }]
          const tx = await window.tronWeb.transactionBuilder.triggerSmartContract(usdtContractAddress, functionSelector, {}, parameter);
          const signedTx = await window.tronWeb.trx.sign(tx.transaction);
          Res = await window.tronWeb.trx.sendRawTransaction(signedTx);
        }
        else { //if asset type is usdc/usdd
          const functionSelector = 'transfer(address,uint256)';
          const parameter = [{ type: 'address', value: address }, { type: 'uint256', value: amt * 1e9 }]//amt*1e18
          const tx = await window.tronWeb.transactionBuilder.triggerSmartContract(usddContractAddress, functionSelector, {}, parameter);
          // const tx = await window.tronWeb.transactionBuilder.triggerSmartContract('Contract_Address', functionSelector, {}, parameter);
          const signedTx = await window.tronWeb.trx.sign(tx.transaction);
          Res = await window.tronWeb.trx.sendRawTransaction(signedTx);
        }

        if (Res.result) {
          setID(Res.txid)
          const transactionDetails = {
            timestamp: new Date(),
            senderAddress: window.tronWeb.defaultAddress.base58,
            recipientAddress: add,
            asset: ass,
            amount: amt,
            txId: Res.txid,
          };

          const { senderAddress, recipientAddress, amount, asset, txId } = transactionDetails;
          const res = await fetch("http://localhost:8000/sender_to_serviceProvider", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              senderAddress, recipientAddress, amount, asset, txId
            })
          })

          const data = await res.json();

          if (res.status === 404 || res.status === 400 || !data) {
            notifyA("Invalid Entry");
          }
          else {
            const handleSendTransaction = async () => {
              try {
                const url = `http://localhost:8000/sendtxn?recipientAddress=${add}&asset=${ass}&amount=${amt}&usdt=${usdtContractAddress}&usdc=${usddContractAddress}`;
                const response = await fetch(url, {
                  method: 'GET',
                });

                if (response.ok) {
                  const data = await response.json();
                  console.log("Response:", data);





                  const checkTransactionStatus = async () => {
                    const ans = await window.tronWeb.trx.getConfirmedTransaction(Res.txid);
                    // // console.log("ANS: ", ans.ret[0].contractRet);
                    // console.log("ANS: ", ans);
                    let value = ans.ret[0].contractRet

                    if (value === "SUCCESS") {
                      clearInterval(intervalId);
                      updatePayment(Res.txid);
                      setLoading(false);
                      notifyB("Funds Added Successfully!!!");
                      navigate('/private/history')
                    }
                  };

                  const intervalId = setInterval(checkTransactionStatus, 60000);




                  // updatePayment(Res.txid);

                } else {
                  console.error('Error:', response.statusText);
                }
              } catch (error) {
                console.error('Error:', error);
              }
            };
            setLoading(true);
            handleSendTransaction();
          }

        }
        else {
          notifyA("Transaction Fail: ", Res.result.message);
        }
      }

      catch (error) {
        console.log(address)
        notifyA(`Error sending transaction: ${error}`);
      }
    } else {
      notifyA('Please install and log in to TronLink wallet to initiate the transaction.');
    }
  };


  const generateQRCode = async () => {
    if (!amt || !add || !ass) {
      setError("All Fields Are Required!");
      return;
    }

    const queryString = `amt=${encodeURIComponent(amt)}&add=${encodeURIComponent(add)}&asset=${encodeURIComponent(ass)}`;
    const url = await qrCode.toDataURL(`http://localhost:3000/pay?${queryString}`);
    setSrc(url);
  };

  const validateInput = (e) => {
    const input = e.target;
    if (input.validity.valid) {
      setError('');
    } else {
      setError(input.validationMessage);
    }
  };

  function myFunction() {
    var copyText = document.getElementById("myInput");

    var range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
      document.execCommand('copy');
      alert("Copied the text: " + copyText.textContent);
      setID(null)
    } catch (err) {
      console.error('Unable to copy text');
    }

    window.getSelection().removeAllRanges();
  }


  return (
    <>
      <Navbar />
      {id ? <><div className="text-center">
        <div className='text-center'><div>Transaction Id:</div>       <div id="myInput">{id}</div>
          <button className=" btn btn-outline-success ms-2 fw-semibold" onClick={myFunction} type="submit">Copy</button>
        </div></div>
      </> : ''}

      {
        loading ? <><div className='text-center'><div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div><span>Processing Transaction, Please Wait</span></div></> : ""
      }

      <main>
        <div className="wrapper">
          <header>
            <h1>Scan & Pay</h1>
          </header>
          <form className="form">
            {src ? '' : <><input id="amount"
              placeholder="Amount"
              value={amt}
              onInput={validateInput}
              onChange={(e) => setAmt(e.target.value)}
              min="0"
              step="0.01"
              required />
              <div>
                <label htmlFor="asset">Asset</label>
                <select id="asset" value={ass} onChange={(e) => setAsset(e.target.value)}>
                  <option value="USDT">USDT</option>
                  <option value="USDC">USDC</option>
                  <option value="TRX">TRX</option>
                </select>
              </div>
              <input id="address"
                placeholder="Wallet Address"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
                required />
              <button type="button" onClick={generateQRCode}>
                Continue
              </button></>}
            {error && <h5 className="error text-center mt-3 text-danger">{error}</h5>}
          </form>
          {src && (

            <>
              {/* <input type="text" value={id}/> */}
              <div className="qr-code">
                <img src={src} alt="qr-code" />
              </div>
              <div className='text-center m-3'>
                <button type="button" onClick={openTronLinkWallet}>
                  {/* <button type="button" onClick={open}> */}
                  Pay Using TronLink
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <style>
        {`
        *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
main{
  display: flex;
  padding: 0 10px;
  min-height: 100vh;
  align-items: center;
  background: white;
  justify-content: center;
}
select{
  border: 2px solid black;
  margin-inline: 5px;
}
.wrapper{
  height: auto;
  width: 500px;
  background: #fff;
  border-radius: 7px;
  padding: 20px 25px 0;
  transition: height 0.2s ease;
  border: 2px solid black;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
.wrapper.active{
  height: 530px;
}
header h1{
  font-size: 21px;
  font-weight: 500;
}
header p{
  margin-top: 5px;
  color: #575757;
  font-size: 16px;
}
.wrapper .form{
  margin: 20px 0 25px;
}
.form :where(input, button){
  width: 100%;
  height: 55px;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: 0.1s ease;
}
.form input{
  font-size: 18px;
  padding: 0px 17px;
  margin-block: 7px;
  border: 1px solid #999;
}

.form input:focus{
  box-shadow: 0 3px 6px rgba(0,0,0,0.13);
}
.form input::placeholder{
  color: #999;
}
.form button{
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  font-size: 17px;
  background: #3498DB;
}
.qr-code{
  display: flex;
  border-radius: 5px;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  border: 1px solid #ccc;
}

.qr-code img{
  width: 200px;
  height: 200px;
  border: none
}

@media (max-width: 430px){
  .wrapper{
    height: auto;
    width: auto;
    padding: 16px 20px;
  }
  .wrapper.active{
    height: 510px;
  }
  header p{
    color: #696969;
  }
  .form :where(input, button){
    height: 52px;
  }
  .qr-code img{
    width: 160px;
  }  
  .btn{
    margin-block: auto;
  }
}

`}
      </style>

    </>
  );
}




