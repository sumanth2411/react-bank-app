import React, { useState } from 'react';
import Transactions from './userComponents/Transactions/Transactions';
import UpdateProfile from './userComponents/updateProfile/UpdateProfile';
import './UserDashboard.css';
import ViewPassbookModal from './userComponents/Passbook/ViewPassbookModal';
import ViewPassbook from './userComponents/Passbook/Passbook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('passbook');
  const [showPassbookModal, setShowPassbookModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleViewPassbook = (account) => {
    setSelectedAccount(account);
    setShowPassbookModal(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'passbook':
        return selectedAccount ? (
          <ViewPassbook accountNumber={selectedAccount} />
        ) : (
          <div>Please select an account to view the passbook.</div>
        );
      case 'transactions':
        return <Transactions />;
      case 'updateProfile':
        return <UpdateProfile />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'passbook' ? 'active' : ''}
          onClick={() => {
            setActiveTab('passbook');
            setShowPassbookModal(true);
          }}
        >
          Passbook
        </button>
        <button
          className={activeTab === 'transactions' ? 'active' : ''}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={activeTab === 'updateProfile' ? 'active' : ''}
          onClick={() => setActiveTab('updateProfile')}
        >
          Update Profile
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
      <ViewPassbookModal
        show={showPassbookModal}
        handleClose={() => setShowPassbookModal(false)}
        selectedOption={selectedAccount}
        setSelectedOption={handleViewPassbook}
      />
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
