import axios from '@/dbutils/axios';

const getToken = () => sessionStorage.getItem("token");

export const changePassword = async ( password : string) => {
  const token = getToken();
  try {
    const response = await axios.put("/secure/customers/password", password, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Operation failed: ', error);
    throw new Error('Operation failed. Please try again.');
  }
};

export const checkPassword = async ( password : string) => {
  const token = getToken();
  try {
    const response = await axios.put("/secure/customers/password-validation", password, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Operation failed: ', error);
    throw new Error('Operation failed. Please try again.');
  }
};