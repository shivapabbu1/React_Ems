
import axios from "axios";
const API = import.meta.env.VITE_API_EMS_BACKEND_API || 'default_value_if_not_defined';

// Use apiUrl in your fetch or wherever you're using EMS_BACKEND_API

const fetchAllEmployees = async (accessToken) => {
  try {
    const response = await axios.get(`${API}/Allemps`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch employees data. Please try again later.");
  }
};

const saveEmployee = async (formData, accessToken) => {
  try {
      const response = await axios.post(
          `${API}/saveNew/Emp`,
          formData,
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                 
              },
          }
      );
      return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error saving employee:", error); // Log error for debugging purposes
    throw new Error("Failed to save employee. Please try again later.");
  }
};



const deleteEmployeeById = async (id, accessToken) => {
    try {
      await axios.delete(`${API}/delEmp/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`Employee with ID ${id} deleted successfully`);
    } catch (error) {
      throw new Error("Failed to delete employee. Please try again later.");
    }
  };

  const fetchEmployeeById = async (id, accessToken) => {
    try {
      const response = await axios.get(`${API}/getEmp/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employee details. Please try again later.");
    }
  };


  const fetchEmployeeByEmail = async (email, accessToken) => {
    try {
      const response = await axios.get(`${API}/email/${email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employee details. Please try again later.");
    }
  };

  const updateEmployee = async (id, updatedData, accessToken) => {
    try {
      const response = await axios.put(
        `${API}/updateEmp/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update employee. Please try again later.");
    }
  };

  const updatePassword = async (userId, newPassword, accessToken) => {
    try {
      const response = await axios.patch(
      `${API}/${userId}/password`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data; // Assuming backend returns a success message
    } catch (error) {
      throw new Error(`Error updating password: ${error.response.data}`);
    }
  };
  
  const assignRoleToUser = async (roleId, users, accessToken) => {
    try {
      const response = await axios.post(
        `${API}/${roleId}/users`,
        { users },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data; // Assuming backend returns a success message or status
    } catch (error) {
      throw new Error(`Error assigning role: ${error.response.data}`);
    }
  };
  
  const getAuth0UserByEmail = async (email, accessToken) => {
    try {
      
      const response = await axios.get(
        `${API}/byemail?email=${email}`,
       
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data; // Assuming backend returns a success message or status
    } catch (error) {
      throw new Error(`Error assigning role: ${error.response.data}`);
    }
  };

  const getApiManagmentAcessToken = async (accessToken) => {
    try {
      const response = await axios.get(
        `${API}/generate-token`,
       
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data; // Assuming backend returns a success message or status
    } catch (error) {
      throw new Error(`Error in generate token api : ${error.response.data}`);
    }


  };
  
  const getAuth0Roles = async (accessToken) => {
    try {
      const response = await axios.get(
        `${API}/roles`,
       
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data; // Assuming backend returns a success message or status
    } catch (error) {
      throw new Error(`Error in generate token api : ${error.response.data}`);
    }
  };

  const generatePaySlip = async (accessToken, employeeId, paySlipDTO) => {
    try {
      const response = await axios.post(
        `${API}/payslips/generate-payslip/${employeeId}`,
        paySlipDTO,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error in generate payslip: ${error.response.data}`);
    }
  };




export { 
  fetchAllEmployees ,
  deleteEmployeeById,
  fetchEmployeeByEmail,
  fetchEmployeeById ,
  updateEmployee,
  saveEmployee,
  updatePassword,
  assignRoleToUser,
  getAuth0UserByEmail,
  getApiManagmentAcessToken,
  getAuth0Roles,
  generatePaySlip,
};
