import React, { useEffect, useState } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { fetchAllAccounts } from '../../../../services/CustomerServices';

const ViewPassbookModal = ({
  show,
  handleClose,
  selectedOption,
  setSelectedOption,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const response = await fetchAllAccounts();
        const accountOptions = response.map((account) => ({
          value: account.accountNumber,
          label: account.accountNumber,
        }));
        setOptions(accountOptions);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    getAllAccounts();
  }, []);

  const handleViewPassbook = () => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
      handleClose();
    }
  };

  return (
    <BootstrapModal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal"
      backdropClassName="custom-backdrop"
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>View Passbook</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="passbookSelect">Select an Account:</label>
            <select
              id="passbookSelect"
              className="form-control"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleViewPassbook}>
          View
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default ViewPassbookModal;
