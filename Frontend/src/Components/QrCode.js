import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import USDT_ABI from './ABI.json'


export default function QrCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amt, add, src, ass } = location.state;
  const serviceProviderWalletAddress = "TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd"

  // const openTronLinkWallet = async () => {
  //   if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
  //     const amount = amt * 1e6;
  //     try {
  //       const Res = await window.tronWeb.trx.sendTransaction(serviceProviderWalletAddress, amount);

  //       if (Res.result) {
  //         const transactionDetails = {
  //           timestamp: new Date(),
  //           senderAddress: window.tronWeb.defaultAddress.base58,
  //           recipientAddress: add,
  //           asset:ass,
  //           amount: amt
  //         };

  //         const {senderAddress , recipientAddress, amount , asset} = transactionDetails;
  //         const res = await fetch("http://localhost:8000/sender_to_serviceProvider",{
  //           method : "POST",
  //           headers:{
  //             "Content-Type":"application/json"
  //           },
  //           body: JSON.stringify({
  //             senderAddress,recipientAddress,amount,asset 
  //           })
  //         })

  //         const data = await res.json();

  //         if(res.status === 404 || res.status === 400 || !data){
  //           window.alert("Invalid Entry");
  //         }
  //         else{
  //         window.alert("Funds Added Successfully!!!");
  //         }
  //       }
  //       else {
  //         window.alert("Transaction Fail: ",Res.result.message);
  //       }
  //     }

  //     catch (error) {
  //       window.alert(`Error sending transaction: ${error}`);
  //     }
  //   } else {
  //     alert('Please install and log in to TronLink wallet to initiate the transaction.');
  //   }
  // };

const openTronLinkWallet = async () => {
    // const parsedUSDT_ABI = JSON.parse(USDT_ABI);
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      try {
        // const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
        // const usdtContract = window.tronWeb.contract(USDT_ABI, usdtContractAddress);
        // const transferResult = await usdtContract.transfer(add, amt).send();
        // if (transferResult.result) {
        //   window.alert('USDT Transfer Successful');
        // } else {
        //   window.alert('USDT Transfer Failed');
        // }
        const functionSelector = 'transfer(address,uint256)';
        const parameter = [{type:'address',value:add},{type:'uint256',value:amt}]
        const tx = await window.tronWeb.transactionBuilder.triggerSmartContract('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', functionSelector, {}, parameter);
        const signedTx = await window.tronWeb.trx.sign(tx.transaction);
        const result = await window.tronWeb.trx.sendRawTransaction(signedTx);
        console.log(result)
      }
      catch (error) {
        window.alert(`Catch Block: ${error}`);
      }
    } 
    else {
      alert('Please install and log in to TronLink wallet to initiate the transaction.');
    }
  };

  const copyImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = document.getElementById('qrcode');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(() => {
          window.alert('QR code image copied to clipboard.');
        })
        .catch((error) => {
          window.alert(`Error copying image: ${error.message}`);
        });
    });
  };

  const copyUrl = () => {
    const url = src.replace(/^data:image\/png;base64,/, '');

    navigator.clipboard.writeText(url)
      .then(() => {
        window.alert('QR code URL copied to clipboard.');
      })
      .catch((error) => {
        window.alert(`Error copying URL: ${error.message}`);
      });
  };

  
  return (
    <>
      <h1 style={{"marginTop":"9rem"}}><span>S</span>can and <span>P</span>ay</h1>
      <p>Amount to Receive : {amt} {ass}</p>
      <p>Receiver's Account : {add}</p>
      <div className="qrcode-container">
        <img id="qrcode" src={src} alt="qrcode" />
        <div className="qrcode-overlay"></div>
      </div>
      <br />
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
    </>
  )
}
