import { useLocation, useNavigate } from 'react-router-dom';

export default function QrCode(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { amt, add, src, ass } = location.state;
  const serviceProviderWalletAddress = "TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd"
  // const serviceProviderWalletAddress = props.Add

  const openTronLinkWallet = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      const from = window.tronWeb.defaultAddress.base58;
      const amount = amt * 1e6;
      try {
        let Res;
        if(ass==='TRX'){
          Res = await window.tronWeb.trx.sendTransaction(serviceProviderWalletAddress, amount);
        }
        else if(ass==='USDT'){
          // Res = await window.tronWeb.trx.sendToken(serviceProviderWalletAddress , amt, '1000308');
          Res = await window.tronWeb.transactionBuilder.sendAsset(serviceProviderWalletAddress, amt, "1000308", from);  //USDT
          // Res = await window.tronWeb.transactionBuilder.sendAsset(serviceProviderWalletAddress, amt, "1004829", from); //BTT
          console.log(Res)
        }
        else{ //if asset type is usdc/usdd
          Res = await window.tronWeb.trx.sendToken(serviceProviderWalletAddress , amt, '.......');
        }
        
        // if (Res && (Res.result===true || Res.visible === false)) {
        if (Res && Res.result===true) {
          const transactionDetails = {
            timestamp: new Date(),
            senderAddress: window.tronWeb.defaultAddress.base58,
            recipientAddress: add,
            asset:ass,
            amount: amt
          };

          const {senderAddress , recipientAddress, amount , asset} = transactionDetails;
          const res = await fetch("http://localhost:8000/sender_to_serviceProvider",{
            method : "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              senderAddress,recipientAddress,amount,asset 
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
          window.alert("Transaction Fail: ",Res.result.message);
        }
      }

      catch (error) {
        window.alert(`Error sending transaction: ${error}`);
      }
    } else {
      alert('Please install and log in to TronLink wallet to initiate the transaction.');
    }
  };

  
  return (
    <>
      <h1 style={{"marginTop":"9rem"}}><span>S</span>can and <span>P</span>ay</h1>
      <p>Amount to Receive : {amt} {ass}</p>
      {/* <p>Receiver's Account : {add}</p> */}
      <p>Receiver's Account : {serviceProviderWalletAddress}</p>
      <div className="qrcode-container">
        <img id="qrcode" src={src} alt="qrcode" />
        <div className="qrcode-overlay"></div>
      </div>
      <br />
<<<<<<< HEAD
      <button onClick={openTronLinkWallet}>Pay Using Tronlink</button>
      <Link to='/logout'>Logout</Link>
=======
      <div className='text-center'>
      <button style={{"marginInline":"auto"}} className="metamask-button" onClick={openTronLinkWallet}>Pay Using TronLink</button>
      </div>
      <style>
        {`:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-family: Arial, sans-serif;
  --font-size: 16px;
}

h1 {
  font-family: var(--font-family);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

h1 span {
  color: var(--primary-color);
}

p {
  font-family: var(--font-family);
  font-size: var(--font-size);
  text-align: center;
  margin-bottom: 10px;
}

.qrcode-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.qrcode-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qrcode-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1), transparent);
  background-size: 50% 100%, 100% 50%;
  background-position: left top, left top;
  background-repeat: no-repeat;
  animation: scan 3s infinite;
}

@keyframes scan {
  0% {
    background-position: left top, left top;
  }
  50% {
    background-position: right top, left bottom;
  }
  100% {
    background-position: left top, left top;
  }
}

.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

button, a {
  font-family: var(--font-family);
  font-size: var(--font-size);
  font-weight: bold;
  color: white;
  background-color: var(--primary-color);
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

button:focus, button:hover, a:focus, a:hover {
  background-color: orange;
}

.metamask-button {
  margin-top: 20px;
}

@media (max-width: 400px) {
  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.8rem;
  }

  .qrcode-container {
    width: 200px;
    height: 200px;
  }

  button, a {
    font-size: 0.8rem;
    padding: 5px;
  }
}
`}
      </style>
>>>>>>> d3ec3f498b8f952f0b9651cb45e543a5b0efc335
    </>
  )
}
