import React, { useEffect, useState } from 'react';

export default function Admin() {
    const array = [
        {
            "from": "TBcwdHmFLygA4jdrUuZY9DnYw45Jdycjqi",
            "to": "TPhjcXiHnF4oc7cdPmC5VyFqi99gDTCU4z",
            "date": "2012-02-03",
            "amount": "1 ",
            "id": "1",
        },
        {
            "from": "TBcwdHmFLygA4jdrUuZY9DnYw45hdycjqi",
            "to": "TPhjcXiHnF4oc7cdPmC5VyFqi99gDTCU4z",
            "date": "2012-02-04",
            "amount": "101 ",
            "id": "2"
        },
        {
            "from": "TBcwdHmFLygA4jdrU3ZY9DnYw45Jdycjqi",
            "to": "TPhjcXiHnF4oc7cdPmC5VyFqi99gDTCU4z",
            "date": "2012-02-05",
            "amount": "102 ",
            "id": "3"
        }
    ];

    const [list, setList] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        window.alert("Make Sure to login into Wallet Before doing any transaction")
        setList(array);
    }, []);

    
    const pay = async (id) => {
        setSelectedButton(id);
        const element = list.find((elem) => elem.id === id);
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            const toAddress = element.to;
            const amount = (element.amount - element.amount * 0.01)*1e6;
            console.log(amount);
    
            try {
                const Res = await window.tronWeb.trx.sendTransaction(toAddress, amount);
    
                if (Res.result) {
                    window.alert("Payment Successful");
                    const changedElement = list.filter((ele) => ele.id !== id);
                    setList(changedElement);
                } else {
                    console.error('Error sending transaction:', Res.result.message);
                    window.alert("Transaction Fail");
                }
            } catch (error) {
                console.error('Error sending transaction:', error);
                setSelectedButton(null);
                window.alert("Transaction Error");
            }
        } else {
            alert('Please install and log in to TronLink wallet to initiate the transaction.');
        }
        
    };
    
    
    return (
        <>
            <div className='container'>
                <ul className="list-group">
                    {list.map((ele) => (
                        <div className='d-flex justify-content-evenly gap-3 text-center mb-2' key={ele.id}>
                            <li className="list-group-item">From: {ele.from}</li>
                            <li className="list-group-item">To: {ele.to}</li>
                            <li className="list-group-item">{ele.date}</li>
                            <li className="list-group-item">{ele.amount}</li>
                            <button
                                type="button"
                                className={`btn btn-primary text-center ${selectedButton === ele.id ? 'btn-success' : ''}`}
                                onClick={() => pay(ele.id)}
                            >
                               {selectedButton === ele.id ? 'Processing' : 'Pay'}
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
}
