import axios from '@/dbutils/axios';

interface ChangePasswordParams {
  userId: string;
  password: string;
}

export const changePassword = async ({ userId, password }: ChangePasswordParams) => {
  try {
    const userPassword = { password };
    const response = await axios.put(`/secure/customers/password/${userId}`, userPassword);
    return response.data;
  } catch (error) {
    console.error('Operation failed: ', error);
    throw new Error('Operation failed. Please try again.');
  }
};