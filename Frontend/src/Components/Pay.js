// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Web3 from 'web3'
// import USDT_ABI from './USDT_ABI.json'; // Update the path accordingly

// const Pay = () => {
// const parsedUSDT_ABI = JSON.parse(USDT_ABI);

//   const location = useLocation();
//   const { state } = location;

//   if (!state) {
//     return <div>No payment details found.</div>;
//   }

//   const { amt, add } = state;
//   const openMetamaskWallet = async () => {
//     if (window.ethereum) {
//       try {
//         await window.ethereum.request({ method: 'eth_requestAccounts' });

//         const fromAddress = window.ethereum.selectedAddress;
//         const toAddress = add;
//         const amount = amt;

//         const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

//         const web3 = new Web3(window.ethereum);

//         // Use the parsed ABI
//         const usdtContract = new web3.eth.Contract(parsedUSDT_ABI, usdtContractAddress);

//         const transferResult = await usdtContract.methods.transfer(toAddress, amount).send({ from: fromAddress });

//         if (transferResult.status) {
//           window.alert('USDT Transfer Successful');
//         } else {
//           window.alert('USDT Transfer Failed');
//         }
//       } catch (error) {
//         console.log("Error: ",error)
//         window.alert(`Error sending transaction: ${error.message}`);
//       }
//     } else {
//       alert('Please install and log in to Metamask to initiate the transaction.');
//     }
//   };

//   return (
//     <>
//       <button onClick={openMetamaskWallet}>Pay</button>
//     </>
//   );
// };

// export default Pay;