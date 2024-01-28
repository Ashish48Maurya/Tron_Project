import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../store/auth';

const History = () => {

  const { token,user } = useAuth();

  const [transactions, setTransactions] = useState([]);

  const getHistory = async () => {
    try {
      const url = "http://localhost:8000/history_serviceProvider";
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log("API Data:", data.Payments);
        setTransactions(data.Payments);
        console.log(user);
      } else {
        console.error('Failed to fetch payment history:', res.status);
      }
    } catch (error) {
      console.log('Error fetching payment history:', error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);


  function formatTimestamp(timestampString) {
    const date = new Date(timestampString);
    return date.toLocaleString();
  }

  return (
    <>
      <div>
        <Navbar />
        <div className='mt-3'>
        <h2 className='text-center text-success'>Transaction History</h2>
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
                <tr key={transaction._id}>
                  <td>{transaction.from}</td>
                  <td>{transaction.to}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.asset}</td>
                  <td>{transaction.status}</td>
                  <td>{formatTimestamp(transaction.timestamps)}</td>
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
