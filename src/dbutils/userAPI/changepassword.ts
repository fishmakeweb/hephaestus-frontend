import axios from '@/dbutils/axios';

const getToken = () => sessionStorage.getItem("token");

export const checkAndChangePassword = async (oldPassword: string, newPassword: string) => {
  const token = getToken();
  
  if (!token) {
    throw new Error("Token not found in session storage");
  }

  const payload = {
    oldPassword,
    newPassword
  };

  try {
    const response = await axios.put('/secure/customers/password', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;  
  }
};
