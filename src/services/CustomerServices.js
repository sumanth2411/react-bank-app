import axios from "axios";
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:8082/api/auth/getCurrentUser`,
      {
        params: {
          email: email,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPassbook = async (
  from,
  to,
  page,
  size,
  sortBy,
  direction,
  accountNumber
) => {
  try {
    const response = await axios.get(
      `http://localhost:8082/api/bank/customers/passbook/${accountNumber}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        params: {
          from: from,
          to: to,
          page: page,
          size: size,
          sortBy: sortBy,
          direction: direction,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllAccounts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8082/api/bank/customers/accounts",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const performTransaction = async (
  senderAccount,
  receiverAccount,
  amount
) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/api/bank/customers/transactions",
      null,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        params: {
          senderAccountNumber: senderAccount,
          receiverAccountNumber: receiverAccount,
          amount: amount,
        },
      }
    );
    console.log("Transaction response:", response);
    return response.data;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
};

export const depositAmount = async (accountNumber, amount) => {
  try {
    const response = await axios.put(
      `http://localhost:8082/api/bank/customers/${accountNumber}/deposit`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: {
          amount: amount,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.put('http://localhost:8082/api/bank/customers/profile', formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authToken')
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

export const profileUpdate = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.put(
      `http://localhost:8082/api/bank/customers/profile`,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response
  } catch (error) {
    console.error(error);
  }
};

export const updateUser=async(firstName,lastName,email)=>{
  try{
    const response=await axios.put(`http://localhost:8082/api/bank/customers/profile`,
      {
        firstName:firstName,
        lastName:lastName,
        email:email
      },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("authToken")}`
    }})
    console.log(firstName,lastName,email)
    return response;
  }
  catch(error){
    console.error(error);
  }
}

// ----------------------------------------------

