import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../../sharedComponents/table/Table";
import "./Passbook.css";
import { sanitizeTransactionData } from "../../../utils/helpers/Data";
import ViewPassbookFilter from "../../../adminDashboard/adminComponents/viewTransactions/TransactionFilter";
import { getPassbook as fetchPassbook } from "../../../../services/CustomerServices";

const ViewPassbook = ({ accountNumber }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [from, setFromDate] = useState();
  const [to, setToDate] = useState();
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("asc");
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    try {
      const data = await fetchPassbook(
        from,
        to,
        page,
        size,
        sortBy,
        direction,
        accountNumber
      );
      if (data && data.content) {
        const sanitizedData = sanitizeTransactionData(data);
        setTransactions(sanitizedData);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (accountNumber) {
      getAllTransactions();
    }
  }, [page, size, sortBy, direction, from, to, accountNumber]);

  return (
    <div className="view-transactions-container">
      <>
        <div>
          <button
            className="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
        <div className="title">View Passbook</div>
        <ViewPassbookFilter
          dataList={
            transactions.content && transactions.content.length > 0
              ? Object.keys(transactions.content[0])
              : []
          }
          setFromDate={setFromDate}
          setToDate={setToDate}
          setSortBy={setSortBy}
          setDirection={setDirection}
        />
        <Table
          data={transactions}
          setPage={setPage}
          setSize={setSize}
          setDirection={setDirection}
          setSortBy={setSortBy}
        />
      </>
    </div>
  );
};

export default ViewPassbook;
