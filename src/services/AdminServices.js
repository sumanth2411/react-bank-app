import axios from "axios";
export const viewAllCustomers=async (page,size,sortBy,direction)=>{
    try{
        const response=await axios.get(`http://localhost:8082/api/bank/admin/customers`,{
            headers:{
                authorization:`Bearer ${localStorage.getItem('authToken')}`
            },
            params:{page,size,sortBy,direction}
        })
        return response.data
    }
    catch(error){
        console.log(error);
    }
}
export const ActivateCustomer = async (customerID) => {
    try {
        const response = await axios.put(
           `http://localhost:8082/api/bank/admin/customers/${customerID}/activate`, 
            {}, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error activating customer:', error);
    }
};

export const DeactivateCustomer = async (customerID) => {
    try {
        const response = await axios.delete(
            `http://localhost:8082/api/bank/admin/customers/${customerID}/deactivate`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error deactivating customer:', error.response ? error.response.data : error.message);
    }
};

export const addCustomer = async (userID, firstName, lastName) => {
    try {
        const response = await axios.post(
            `http://localhost:8082/api/bank/admin/customers/${userID}`,
            { firstName, lastName },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error while adding customer:', error);
        throw error; 
    }
};



export const viewAllTransactions=async(from,to,page,size,sortBy,direction)=>{
    try{
        const response=await axios.get(`http://localhost:8082/api/bank/transactions`,{
            headers:{
                authorization:`Bearer ${localStorage.getItem('authToken')}`
            },
            params:{from,to,page,size,sortBy,direction}
        })
        return response.data
    }
    catch(error){
        console.log(error);
    }
}

export const checkUserIDExists = async (customerID) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/bank/admin/customers/${customerID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data;
    }   catch (error) {
        console.log(error);
    }
  };

export const addBankAccount = async (bankId, customerID) => {
    try {
        const response = await axios.post(
            `http://localhost:8082/api/bank/admin/banks/${bankId}/customers/${customerID}/accounts`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding bank account:', error.response ? error.response.data : error.message);
        throw error;
    }
};