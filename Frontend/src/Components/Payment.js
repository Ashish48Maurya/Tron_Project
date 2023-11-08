import React from 'react'

function Payment() {

  useEffect(()=>{
    window.alert("Logged In To The Wallet before Doing Any Transaction");
  },[])

  const [iAmt, setAmt] = useState("");
  const [iAdd, setAdd] = useState("");

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
      <div className='box'>
        <div className='head-1'>
          <h2>Crypto Payments</h2>
        </div>
        <div className='htmlForm'>
          <h3>Merchant Dashboard</h3>

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