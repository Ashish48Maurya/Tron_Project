import React from 'react'

export default function Pay() {
  const tronlink = window.tronlink;
  const openTronLinkWallet = async (amt,add,ass) => {
    if (tronlink && tronlink.installed && tronlink.loggedIn) {
      try {
        let Res;
        if (ass === 'TRX') {
          const amount = amt * 1e6;
          Res = await tronlink.trx.sendTransaction(address, amount);
          setID(Res.txid)
          console.log(Res)
        }
        else if (ass === 'USDT') {

          const functionSelector = 'transfer(address,uint256)';
          const parameter = [{ type: 'address', value: address }, { type: 'uint256', value: amt * 1e6 }]
          const tx = await tronlink.transactionBuilder.triggerSmartContract(usdtContractAddress, functionSelector, {}, parameter);
          const signedTx = await tronlink.trx.sign(tx.transaction);
          Res = await tronlink.trx.sendRawTransaction(signedTx);
          setID(Res.txid)
        }
        else { //if asset type is usdc/usdd
          const functionSelector = 'transfer(address,uint256)';
          const parameter = [{ type: 'address', value: address }, { type: 'uint256', value: amt * 1e9 }]//amt*1e18
          const tx = await tronlink.transactionBuilder.triggerSmartContract(usddContractAddress, functionSelector, {}, parameter);
          // const tx = await tronlink.transactionBuilder.triggerSmartContract('Contract_Address', functionSelector, {}, parameter);
          const signedTx = await tronlink.trx.sign(tx.transaction);
          Res = await tronlink.trx.sendRawTransaction(signedTx);
          setID(Res.txid)
        }

        if (Res.result) {
          const transactionDetails = {
            timestamp: new Date(),
            senderAddress: tronlink.defaultAddress.base58, //Doubt
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
            notifyB("Funds Added Successfully!!!");
           
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
  return (
    <div className="container" style={{"display":"flex" , "justifyContent":"center" , "alignItems":"center" , "minHeight":"100vh"}}>
        <button className="btn bg-danger ms-2 fw-semibold text-white" type="submit"  onClick={openTronLinkWallet(amt,add,ass)}>Pay</button>
    </div>
  )
}
