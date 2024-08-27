import React, { useEffect, useState } from "react";
import { sanitizeData } from "../../../utils/helpers/Data";
import { viewAllCustomers as fetchAllCustomers } from "../../../../services/AdminServices";
import Table from '../../../../sharedComponents/table/Table';
import { useNavigate } from "react-router-dom";
import Filter from "../../../../sharedComponents/filter/Filter";
import '../../../../sharedComponents/filter/Filter.css';
import { verifyAdmin } from "../../../../services/AuthServices";

const ViewCustomers = () => {
  const [isAdmin,setIsAdmin]=useState();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("firstName");
  const [direction, setDirection] = useState("asc");
  const [customers, setCustomers] = useState([]);

  const getAllCustomers = async () => {
    try {
      const data = await fetchAllCustomers(page, size, sortBy, direction);
      console.log('Fetched Data:', data);
      if (data && data.content) {
        const sanitizedData = sanitizeData(data, [
          "customer_id",
          "firstName",
          "lastName",
          "email",
          "active"
        ], setCustomers);
        setCustomers(sanitizedData);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error fetching customers:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, [page, size, sortBy, direction]);


  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      console.log("Response",response)
      if (!response) {
        navigate('/');
        return;
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);


  return (
    <div className="view-customers-container">
      {isAdmin && (
        <>
        <div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="title">View Customers</div>
      <div className="filter">
        <Filter setSortBy={setSortBy} setDirection={setDirection} data={customers} />
      </div>
      <Table data={customers} setPage={setPage} setSize={setSize} setDirection={setDirection} setSortBy={setSortBy} />
      </>)
      }
    </div>
  );
};

export default ViewCustomers;
