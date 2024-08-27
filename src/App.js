import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import SuccessPage from './component/adminDashboard/adminComponents/addAccount/Successpage';
import FailurePage from './component/adminDashboard/adminComponents/addAccount/Failurepage';
import ConfirmationPage from './component/adminDashboard/adminComponents/addAccount/Confirmationpage';
import UserDashboard from './component/userDashboard/UserDashboard';
import AdminDashboard from './component/adminDashboard/AdminDashboard';
import './App.css';
import AddCustomer from './component/adminDashboard/adminComponents/addCustomer/AddCustomer';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path ='/register' element={<Register/>}/>
      <Route exact path='/success' element={<SuccessPage />} />
      <Route exact path='/failure' element={<FailurePage />} />
      <Route exact path='/add-account/confirmation/:customerId/:bankId' element={<ConfirmationPage />} />
      <Route exact path='/user-dashboard' element={<UserDashboard />} />
      <Route exact path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path="/admin/add-customer/:userID" element={<AddCustomer />} />
    </Routes>
  );
}

export default App;
