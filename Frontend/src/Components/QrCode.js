import React from 'react'

export default function QrCode() {

    //Msg for Divy : Fetch iAdd and iAmt from the Payment.js files(Props)

   const openTronLinkWallet = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      const toAddress = iAdd; 
      const amount = iAmt*1e6;

      try {
        await window.tronWeb.trx.sendTransaction(toAddress, amount);
        window.alert("Funds Added Successfully!!!")
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      alert('Please install and log in to TronLink wallet to initiate the transaction.');
    }
  };

  return (
    <>
    <div>QrCode Generation Step</div>
    <button onClick={openTronLinkWallet}>Pay Using Tronlink</button>
    <button>Scan and Pay</button>
    </>
  )
}
