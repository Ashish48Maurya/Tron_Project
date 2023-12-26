import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export default function Admin(props) {

  const { address, usdtContractAddress, usddContractAddress, enum1, enum2, token } = useAuth();
  const [serviceProviderAddress, setServiceProviderAddress] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [usdcAddress, setUsdcAddress] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [list, setList] = useState([]);
  // const [selectedButton, setSelectedButton] = useState(null);
  const [count, setCount] = useState(0);
  const [bal, setBal] = useState(0);
  const [bal1, setBal1] = useState(0);
  const [bal2, setBal2] = useState(0);

  const balance = async (req, res) => {
    try {
      // window.alert(`from Balance: ${address}`)
      const balance = await window.tronWeb.trx.getAccount(address);

      const balance1 = await window.tronWeb.trx.getAccount(enum1);
      const balance2 = await window.tronWeb.trx.getAccount(enum2);
      console.log("Balance is: ", balance);
      console.log("Addresses are: ", address, usdtContractAddress, usddContractAddress, enum1, enum2);

      const formattedBalance = (balance.balance * 1e-6).toFixed(2);
      const formattedBalance1 = (balance1.balance * 1e-6).toFixed(2);
      const formattedBalance2 = (balance2.balance * 1e-6).toFixed(2);

      setBal(formattedBalance);
      setBal1(formattedBalance1);
      setBal2(formattedBalance2);

      res.status(200).json({
        balance: formattedBalance,
        balance1: formattedBalance1,
        balance2: formattedBalance2,
      });
    } catch (err) {
      // notifyA(err);
      if (res) {
        res.status(500).json({ error: `Internal Server Error -> ${err.message}` });
      } else {
        console.error("Response object is undefined");
      }
    }
  };
  balance();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);


  const updatePaymentServiceProvider = async () => {
    console.log("Addresses: ", serviceProviderAddress, usdtAddress, usdcAddress);
    try {
      const response = await fetch(`http://localhost:8000/change_address/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceProvider: serviceProviderAddress,
          usdt: usdtAddress,
          usdc: usdcAddress,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
        notifyB(data.message);
      } else {
        return notifyA("Updation Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getPaymentsDetails = async () => {
    try {
      const response = await fetch("http://localhost:8000/payment_history_serviceProvider", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setList(data.Payments);
      } else {
        window.alert("Server Busy, Try Again Later");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      window.alert("Error fetching payment details");
    }
  };



  const userCounts = async () => {
    try {
      const response = await fetch("http://localhost:8000/count", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {

        const data = await response.json();
        console.log(data);
        setCount(data.userCount);
      } else {
        window.alert("Server Busy");
      }
    } catch (error) {
      console.error("Error fetching User details:", error);
      window.alert("Error fetching User details");
    }
  };


  const handleCheckboxChange = (id) => {
    const updatedSelection = [...selectedTransactions];
    if (updatedSelection.includes(id)) {
      const index = updatedSelection.indexOf(id);
      updatedSelection.splice(index, 1);
    } else {
      updatedSelection.push(id);
    }
    setSelectedTransactions(updatedSelection);
  };

  // const updatePayment = async (id) => {
  //   try {
  //     let updatedAddress = '';
  //     if (selectedTransactions.includes('serviceProvider')) {
  //       updatedAddress = serviceProviderAddress;
  //     } else if (selectedTransactions.includes('usdt')) {
  //       updatedAddress = usdtAddress;
  //     } else if (selectedTransactions.includes('usdc')) {
  //       updatedAddress = usdcAddress;
  //     }


  //     const response = await fetch(`http://localhost:8000/update_payment_serviceProvider/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ status: "completed" }),
  //     });

  //     if (response.status === 200) {
  //       const updatedPayment = await response.json();
  //       console.log(updatedPayment);
  //     } else {
  //       console.error('Failed to update payment:', response.status);
  //       window.alert("Update Payment Failed");
  //     }
  //   } catch (error) {
  //     console.error('Error updating payment:', error);
  //     window.alert("Update Payment Error");
  //   }
  // };

  // const pay = async (id) => {
  //   setSelectedButton(id);
  //   const element = list.find((elem) => elem._id === id);
  //   if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
  //     const toAddress = element.to;
  //     const amount = (element.amount - element.amount * 0.01) * 1e6;
  //     console.log("Amount: ", amount)

  //     try {
  //       const Res = await window.tronWeb.trx.sendTransaction(toAddress, amount);

  //       if (Res.result) {
  //         window.alert("Payment Successful");
  //         const changedElement = list.filter((ele) => ele._id !== id);
  //         setList(changedElement);

  //         updatePayment(element._id);
  //         //Call Update Function


  //       } else {
  //         console.error('Error sending transaction:', Res.result.message);
  //         window.alert("Transaction Fail");
  //       }
  //     } catch (error) {
  //       setSelectedButton(null);
  //       window.alert(error);
  //     }
  //   } else {
  //     alert('Please install and log in to TronLink wallet to initiate the transaction.');
  //   }

  // };





  useEffect(() => {
    getPaymentsDetails();
    userCounts();
    // balance();
  }, []);



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="input-group m-3">
          <input
            type="text"
            className="form-control"
            value={serviceProviderAddress}
            placeholder="Change Service Provider's Address..."
            onChange={(e) => setServiceProviderAddress(e.target.value)}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <button
            className=" btn btn-outline-success ms-2 fw-semibold"
            onClick={updatePaymentServiceProvider}
            type="submit"
          >
            Change
          </button>
        </div>

        <div className="input-group m-3">
          <input
            type="text"
            className="form-control"
            value={usdtAddress}
            placeholder="Change USDT Address..."
            onChange={(e) => setUsdtAddress(e.target.value)}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <button
            className=" btn btn-outline-success ms-2 fw-semibold"
            onClick={updatePaymentServiceProvider}
            type="submit"
          >
            Change
          </button>
        </div>

        <div className="input-group m-3">
          <input
            type="text"
            className="form-control"
            value={usdcAddress}
            placeholder="Change USDC Address..."
            onChange={(e) => setUsdcAddress(e.target.value)}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <button
            className=" btn btn-outline-success ms-2 fw-semibold"
            onClick={updatePaymentServiceProvider}
            type="submit"
          >
            Change
          </button>
        </div>
      </div>
      <div className=''>
        <div className="row">
          <h3 className='container mt-5 d-flex justify-content-center align-items-center col-lg-6 col-md-6 col-12'>
            Users: {count}
          </h3>
          <div className='container mt-5 d-flex justify-content-center align-items-center flex-column col-lg-6 col-md-6 col-12 mx-auto'>
            <h5 style={{ color: bal > 15 ? "green" : "red" }}>
              {address}: {bal} TRX
            </h5>
            <h5 style={{ color: bal1 > 15 ? "green" : "red" }}>
              {enum1}: {bal1} TRX
            </h5>
            <h5 style={{ color: bal2 > 15 ? "green" : "red" }}>
              {enum2}: {bal2} TRX
            </h5>
          </div>
        </div>
      </div>

      <div className="table-responsive mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-center">Select</th>
              <th scope="col" className="text-center">User_ID</th>
              <th scope="col" className="text-center">Transaction_ID</th>
              <th scope="col" className="text-center">Date & Time</th>
              <th scope="col" className="text-center">Amount</th>
              <th scope="col" className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((ele) => (
              <tr key={ele._id}>
                <td>
                  <input
                    type="checkbox"
                    id={`checkbox_${ele._id}`}
                    name={`checkbox_${ele._id}`}
                    value={ele.timestamps}
                    checked={selectedTransactions.includes(ele._id)}
                    onChange={() => handleCheckboxChange(ele._id)}
                  />
                </td>
                <td>{ele._id}</td>
                <td>{ele.txID}</td>
                <td>{ele.timestamps}</td>
                <td>{ele.amount}{ele.asset}</td>
                <td>
                  {ele.status}
                </td>
              </tr>
            ))}
          </tbody>


        </table>
      </div>
      <style>
        {`
                .table {
                  border-collapse: collapse;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .table th, .table td {
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align:center
                }
        
                .table thead {
                  background-color: #f0f0f0;
                }
        
                .table tbody tr:nth-child(even) {
                  background-color: #fafafa;
                }
        
                .table tbody tr:hover {
                  background-color: #e0e0e0;
                  cursor: pointer;
                }
        
                // .btn {
                //   padding: 5px 10px;
                //   border: none;
                //   border-radius: 5px;
                //   color: white;
                // }
        
                // .btn-primary {
                //   background-color: #007bff;
                // }
        
                // .btn-primary:hover {
                //   background-color: #0069d9;
                // }
        
                // .btn-success {
                //   background-color: #28a745;
                // }
        
                .fa {
                  margin-right: 5px;
                }
                @media(max-width:593px){
                  h3{
                    font-size:15px;
                    margin-top:5px;
                  }
                  h5{
                    margin-top:5px;
                    font-size:12px
                  }
                  .table th, .table td{
                    font-size:12px
                  }
                  input{
                    font-size:10px
                  }
                }
              `}
      </style>
    </>
  );
}
