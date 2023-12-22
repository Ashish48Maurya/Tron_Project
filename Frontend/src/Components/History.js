import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const History = () => {

  let api = "http://localhost:8000/payment_history_serviceProvider";

  const [transactions, setTransactions] = useState([]);

  const getHistory = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("API Data:", data.Payments);
      setTransactions(data.Payments);
      console.log("Updated State:", transactions); 
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getHistory(api);
  }, [api]);




  return (
    <>
      <div>
        <Navbar />
        <div>
          <h2>Transaction History</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
             
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                  <th>Asset</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(transactions) && transactions.map(transaction => (
                  <tr key={transaction.id}>
               
                    <td>{transaction.from}</td>
                    <td>{transaction.to}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.asset}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.timestamps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`/* History.css */

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

/* Add media queries for responsiveness */
@media (max-width: 600px) {
  th, td {
    font-size: 14px;
  }
}
`}</style>
    </>
  );
};

export default History;
