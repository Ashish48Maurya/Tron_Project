import React, { useState } from 'react';
import Navbar from './Navbar';


const History = () => {
  const TransactionHistory = () => {
    const initialTransactions = [
      { id: 1, description: 'Purchase Item A', amount: -20.0 },
      { id: 2, description: 'Deposit', amount: 50.0 },
      { id: 3, description: 'Withdrawal', amount: -30.0 },
      // Add more transactions as needed
    ];

    const [transactions, setTransactions] = useState(initialTransactions);

    return (
      <div>
        <h2>Transaction History</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
    <div>
      <Navbar />
      <TransactionHistory />
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
  text-align: left;
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
