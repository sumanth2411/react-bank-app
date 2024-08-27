
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Confirmation.css';
import { addBankAccount } from '../../../../services/AdminServices';
import { successToast,errorToast } from '../../../utils/toast';
import { ToastContainer } from 'react-bootstrap';
const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { customerId, bankId } = useParams(); 

  const handleConfirm = async () => {
    try {
      
      await addBankAccount(customerId, bankId);
    //   successToast("Account added successfully")
       navigate('/success'); 
    } catch (error) {
    //   errorToast("failed to add account")
      navigate('/failure'); 
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div className="confirmation-page">
      <h1>Confirm Details</h1>
      <p><strong>Customer ID:</strong> {customerId}</p>
      <p><strong>Bank ID:</strong> {bankId}</p>
      <button onClick={handleConfirm} className="confirm-button">Confirm</button>
      <button onClick={handleCancel} className="cancel-button">Cancel</button>
     {/* <ToastContainer/> */}
    </div>
  );
};

export default ConfirmationPage;
