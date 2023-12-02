import React, { useEffect, useState } from 'react';

export default function Admin() {

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


    return (
        <>
            <h2 className='text-center mt-2'>Admin Panel</h2>
            <div className="table-responsive mt-5">
                <table className="table table-bordered border-warning">

                    <thead>
                        <tr>
                            <th scope="col" className=' text-center'>From</th>
                            <th scope="col" className=' text-center'>To</th>
                            <th scope="col" className=' text-center'>Date & Time</th>
                            <th scope="col" className=' text-center'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((ele) => (
                            <tr>
                                <td>{ele.from}</td>
                                <td>{ele.to}</td>
                                <td>{ele.timestamps}</td>
                                <td>{ele.amount}TRX</td>
                                <td><button
                                    type="button"
                                    className={`btn btn-primary text-center ${selectedButton === ele._id ? 'btn-success' : ''}`}
                                    onClick={() => pay(ele._id)}
                                >
                                    {selectedButton === ele._id ? 'Processing' : 'Pay'}
                                </button></td>

                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        </>
    );
}
