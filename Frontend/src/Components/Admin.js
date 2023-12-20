import React, { useEffect, useState } from 'react';

export default function Admin(props) {

    const getPaymentsDetails = async (req, res) => {
        const response = await fetch("http://localhost:8000/payment_history_serviceProvider", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            setList(data.Payments);
        } else {
            window.alert("Server Busy, Try Again Later");
        }
    };


    const updatePayment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/update_payment_serviceProvider/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "completed" }),
            })
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



    const [list, setList] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        window.alert("Make Sure to login into Wallet Before doing any transaction")
        getPaymentsDetails();
    }, []);


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

    const [inp,setInp] = useState('');
    const submit=async()=>{
      props.setAdd(inp);
    }

    return (
        <>
        <div className="container">
        <div className="input-group m-3">
        <input type="text" class="form-control" value={inp} placeholder="Change Receiving Address..." onChange={(e)=>{setInp(e.target.value)}} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        
        <button className=" bg-success btn btn-outline-success ms-2 fw-semibold" onClick={submit} type="submit">Change</button>
        </div>
        </div>
          <h2 className="text-center mt-2">Admin Panel</h2>
          <div className="table-responsive mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">From</th>
                  <th scope="col" className="text-center">To</th>
                  <th scope="col" className="text-center">Date & Time</th>
                  <th scope="col" className="text-center">Amount</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((ele) => (
                  <tr key={ele._id}>
                    <td>{ele.from}</td>
                    <td>{ele.to}</td>
                    <td>{ele.timestamps}</td>
                    <td>{ele.amount}{ele.asset}</td>
                    <td>
                      <button
                        type="button"
                        className={`btn ${selectedButton === ele._id ? "btn-success" : "btn-primary"}`}
                        onClick={() => pay(ele._id)}
                      >
                        {selectedButton === ele._id ? <i className="fa fa-check"></i> : "Pay"}
                      </button>
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
      
              .btn {
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                color: white;
              }
      
              .btn-primary {
                background-color: #007bff;
              }
      
              .btn-primary:hover {
                background-color: #0069d9;
              }
      
              .btn-success {
                background-color: #28a745;
              }
      
              .btn-success:hover {
                background-color: #218838;
              }
      
              .fa {
                margin-right: 5px;
              }
            `}
          </style>
        </>
      );
      
}
