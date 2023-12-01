import { useLocation , Link } from 'react-router-dom';

export default function QrCode() {
  const location = useLocation();
  const { amt, add, src } = location.state;
  console.log(location.state)

  const serviceProviderWalletAddress = "TUo8aox2FS2EygQ25cVdq5tEZQVr9eGXJo"

  const openTronLinkWallet = async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      const toAddress = add;
      const amount = amt * 1e6;

      try {
        const Res = await window.tronWeb.trx.sendTransaction(serviceProviderWalletAddress, amount);

        if (Res.result) {
          // const transactionId = Res.result.transactionId;

          // const transactionReceipt = await window.tronWeb.trx.getTransactionInfo(transactionId);
          // console.log("Trans: ",transactionReceipt);

          // const blockHash = transactionReceipt.blockHash;
          // const fee = transactionReceipt.fee;


          const transactionDetails = {
            timestamp: new Date(),
            senderAddress: window.tronWeb.defaultAddress.base58,
            recipientAddress: toAddress,
            amount: amt
            // blockHash,
            // fee
          };
          console.log(transactionDetails);
          const {senderAddress , recipientAddress, amount} = transactionDetails;
          const res = await fetch("http://localhost:8000/sender_to_serviceProvider",{
            method : "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              senderAddress,recipientAddress,amount
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
      <h1><span>S</span>can and <span>P</span>ay</h1>
      <p>Amount to be sent : {amt}TRX</p>
      <p>Sender's Account : {add}</p>
      <div><img src={src} alt="qrcode" /></div>
      <strong>OR</strong>
      <br />
      <button onClick={openTronLinkWallet}>Pay Using Tronlink</button>
      <Link to='/payment'>Home</Link>
    </>
  )
}