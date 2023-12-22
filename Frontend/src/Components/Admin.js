import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

export default function Admin(props) {
  const [serviceProviderAddress, setServiceProviderAddress] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [usdcAddress, setUsdcAddress] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [list, setList] = useState([]);  // Add this line to define the 'list' state
  const [selectedButton, setSelectedButton] = useState(null);


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

  const updatePayment = async (id) => {
    try {
      let updatedAddress = '';
      if (selectedTransactions.includes('serviceProvider')) {
        updatedAddress = serviceProviderAddress;
      } else if (selectedTransactions.includes('usdt')) {
        updatedAddress = usdtAddress;
      } else if (selectedTransactions.includes('usdc')) {
        updatedAddress = usdcAddress;
      }

      const response = await fetch(`http://localhost:8000/update_payment_serviceProvider/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (response.status === 200) {
        const updatedPayment = await response.json();
        console.log(updatedPayment);
      } else {
        console.error('Failed to update payment:', response.status);
        window.alert("Update Payment Failed");
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      window.alert("Update Payment Error");
    }
  };

  const pay = async (id) => {
    setSelectedButton(id);
    const element = list.find((elem) => elem._id === id);
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      const toAddress = element.to;
      const amount = (element.amount - element.amount * 0.01) * 1e6;
      console.log("Amount: ", amount)

      try {
        const Res = await window.tronWeb.trx.sendTransaction(toAddress, amount);

        if (Res.result) {
          window.alert("Payment Successful");
          const changedElement = list.filter((ele) => ele._id !== id);
          setList(changedElement);

          updatePayment(element._id);
          //Call Update Function


        } else {
          console.error('Error sending transaction:', Res.result.message);
          window.alert("Transaction Fail");
        }
      } catch (error) {
        setSelectedButton(null);
        window.alert(error);
      }
    } else {
      alert('Please install and log in to TronLink wallet to initiate the transaction.');
    }

  };

  useEffect(() => {
    console.log("useEffect is running");
    getPaymentsDetails();
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
              className="bg-success btn btn-outline-success ms-2 fw-semibold"
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
              className="bg-success btn btn-outline-success ms-2 fw-semibold"
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
              className="bg-success btn btn-outline-success ms-2 fw-semibold"
              onClick={() => setSelectedTransactions(['usdc'])}
              type="submit"
            >
              Change
            </button>
          </div>
        </div>
        <div className="table-container">
          <h1 className="heading">Admin Page</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Date&Time</th>
                <th>Transaction ID</th>
                <th>User ID</th>
                <th>Transaction Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((ele) => (
                <tr key={ele._id}>
                  <td  data-label="Select">
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
         *{
            margin:0;
            padding:0;
            box-sizing: border-box;
        }
        body{
            font-family: sans-serif;
        }
        button[type="submit"]{
          color:white;
        }
        .table-container{
            padding: 0 10%;
            margin:40px auto 0;
        }
        .heading{
            font-size: 40px;
            text-align:center;
            margin-bottom: 40px;
        }
        .table{
            width: 100%;
            border-collapse: collapse;
        }
        .table thead{
            color:black;
            background-color:blue;
        }
        .table thead tr th{
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.35px;
            // color: white;
            opacity:1;
            padding: 12px;
            vertical-align: top;
            border: 1px solid #dee2e685;
        }
        .table tbody tr td{
            font-size:14px;
            letter-spacing: 0.35px;
            font-weight: normal;
            color: #f1f1f1;
            background-color: #3c3f44;
            padding: 8px;
            text-align: center;
            border: 1px solid #dee2e685;
        }
        /* .table-text_Successful{
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0.35px;
            color: blue;
        } */
        @media (max-width: 768px) {
            .table thread{
                display:none;
            }
            .table, .table tbody, .table tr, .table td{
                display: block;
                width: 100%;

            }
            .table tr{
                margin-bottom: 15px;

            }
            .table tbody tr td{
                text-align: right;
                padding-left: 50%;
                position:relative;
            }
            .table td::before{
                content:attr(data-label);
                position:absolute;
                left:0;
                width: 50%;
                padding-left: 15px;
                font-weight: 600;
                font-size:14px;
                text-align:left;

            }
        }
            `}
      </style>
    </>
  );
}
