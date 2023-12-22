import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { useAuth } from '../store/auth';

export default function Admin(props) {
  const {address} = useAuth();
  const [serviceProviderAddress, setServiceProviderAddress] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [usdcAddress, setUsdcAddress] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [list, setList] = useState([]);  // Add this line to define the 'list' state
  // const [selectedButton, setSelectedButton] = useState(null);
  const [count,setCount] = useState(0);

  const getPaymentsDetails = async () => {
    try {
      const response = await fetch("http://localhost:8000/payment_history_serviceProvider", {
        method: "GET",
        headers: {
          Accept: "application/json",
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
    console.log("useEffect is running");
    getPaymentsDetails();
    userCounts()
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
            onClick={() => setSelectedTransactions(['serviceProvider'])}
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
            onClick={() => setSelectedTransactions(['usdt'])}
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
            onClick={() => setSelectedTransactions(['usdc'])}
            type="submit"
          >
            Change
          </button>
        </div>
      </div>

      {/* <h2 className="text-center m-2">Admin Panel</h2> */}
      <div className='m-3'>
        <h3>Users: {count}</h3>
        <div>{address}</div>
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
              <th scope="col" className="text-center">Actions</th>
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
            <tbody>
              {list.map((ele) => (
                <tr key={ele._id}>
                  <td data-label="Select">
                    <input
                      type="checkbox"
                      id={`checkbox_${ele._id}`}
                      name={`checkbox_${ele._id}`}
                      value={ele.timestamps}
                      checked={selectedTransactions.includes(ele._id)}
                      onChange={() => handleCheckboxChange(ele._id)}
                    />
                  </td>
                  <td data-label="Date&Time">{ele.timestamps}</td>
                  <td data-label="Transaction ID">{ele.txID}</td>
                  <td data-label="User ID">{ele._id}</td>
                  <td data-label="Transaction Status">{ele.status}</td>
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
      
              // .btn-success:hover {
              //   background-color: #218838;
              // }
      
              .fa {
                margin-right: 5px;
              }
            `}
      </style>
    </>
  );
}
