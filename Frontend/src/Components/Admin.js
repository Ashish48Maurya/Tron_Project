import React, { useEffect, useState } from 'react'

export default function Admin() {
    
    const array = [
        {
            "from": "TBcwdHmFLygA4jdrUuZY9DnYw45Jdycjqi",
            "to": "TBcwdHmFLygA4jdrUuZY9DnYw45Jdycjqi",
            "date": "2012-02-03",
            "amount": "100TRX ",
            "id": "1",
        },
        {
            "from": "TBcwdHmFLygA4jdrUuZY9DnYw45hdycjqi",
            "to": "TBcwdHmFLygA4jdrUuZY9DnYw43Jdycjqi",
            "date": "2012-02-04",
            "amount": "101TRX ",
            "id": "2"
        },
        {
            "from": "TBcwdHmFLygA4jdrU3ZY9DnYw45Jdycjqi",
            "to": "TBcwdHmFLygA4jdrUuZY9DhYw45Jdycjqi",
            "date": "2012-02-05",
            "amount": "102TRX ",
            "id": "3"
        }
    ];

    const [list, setlist] = useState([]);

    useEffect(() => {
        setlist(array);
    }, [])

    const pay = async (id)=>{
       const element = list.find((elem)=>{
        return elem.id === id;
       })
       console.log(element);
    }



    return (
        <>
            <div className='container'>
                <ul class="list-group">
                        {
                            list.map((ele)=>{
                            return <div className='d-flex justify-content-evenly gap-3 text-center mb-2' >
                            <li class="list-group-item">From: {ele.from}</li>
                            <li class="list-group-item">To: {ele.to}</li>
                            <li class="list-group-item">{ele.date}</li>
                            <li class="list-group-item">{ele.amount}</li>
                            <button type="button" class="btn btn-primary text-center" onClick={()=>{pay(ele.id)}}>Pay</button>
                            </div>
                            })
                        }
                </ul>
            </div>
        </>
    )
}