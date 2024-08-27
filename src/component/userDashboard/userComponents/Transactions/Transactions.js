import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { performTransaction } from '../../../../services/CustomerServices'; // Adjust the path if necessary
import './Transactions.css';

const Transactions = () => {
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransaction = async (e) => {
    e.preventDefault();

    try {
      // Call the service function to perform the transaction
      await performTransaction(senderAccountNumber, receiverAccountNumber, amount);
      toast.success('Transaction successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transaction failed');
    }
  };

  return (
    <div className="transactions">
      <h2>Make a Transaction</h2>
      <form onSubmit={handleTransaction} className="transaction-form">
        <div className="form-group">
          <label htmlFor="senderAccountNumber">Sender Account Number:</label>
          <input
            type="text"
            id="senderAccountNumber"
            value={senderAccountNumber}
            onChange={(e) => setSenderAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="receiverAccountNumber">Receiver Account Number:</label>
          <input
            type="text"
            id="receiverAccountNumber"
            value={receiverAccountNumber}
            onChange={(e) => setReceiverAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Transactions;
