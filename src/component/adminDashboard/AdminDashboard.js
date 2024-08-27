import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewCustomers from './adminComponents/viewCustomers/ViewCustomer';
import AccountVerticalCenteredModal from './adminComponents/addAccount/AccountVerticalCenteredModal';
import ViewTransaction from './adminComponents/viewTransactions/ViewTransactions';
import MyVerticallyCenteredModal from './adminComponents/addCustomer/MyVerticallyCenteredModal';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddBankAccountModal, setShowAddBankAccountModal] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

  const handleAddCustomerClick = () => {
    setShowAddCustomerModal(true);
  };

  const handleAddBankAccountClick = () => {
    setShowAddBankAccountModal(true);
  };

  const handleModalClose = () => {
    setShowAddCustomerModal(false);
    setShowAddBankAccountModal(false);
  };

  const handleAddCustomerSubmit = (userID) => {
    console.log('User ID:', userID);
    setShowAddCustomerModal(false);
    // Navigate to the AddCustomer form with the userID as a URL parameter
    navigate(`/admin/add-customer/${userID}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'viewCustomers':
        return <ViewCustomers />;
      case 'viewTransactions':
        return <ViewTransaction/>; 
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'viewCustomers' ? 'active' : ''}
          onClick={() => setActiveTab('viewCustomers')}
        >
          View Customers
        </button>
        <button
          className={activeTab === 'addCustomer' ? 'active' : ''}
          onClick={handleAddCustomerClick}
        >
          Add Customer
        </button>
        <button
          className={activeTab === 'addBankAccount' ? 'active' : ''}
          onClick={handleAddBankAccountClick}
        >
          Add Bank Account
        </button>
        <button
          className={activeTab === 'viewTransactions' ? 'active' : ''}
          onClick={() => setActiveTab('viewTransactions')}
        >
          View Transactions
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>

      {/* Add Customer Modal */}
      <MyVerticallyCenteredModal
        show={showAddCustomerModal}
        onHide={handleModalClose}
        onSubmit={handleAddCustomerSubmit}
      />

      {/* Add Bank Account Modal */}
      <AccountVerticalCenteredModal
        show={showAddBankAccountModal}
        onHide={handleModalClose}
      />
    </div>
  );
};

export default AdminDashboard;
