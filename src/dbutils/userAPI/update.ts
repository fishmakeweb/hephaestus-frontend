// utils/updateUser.ts
import axios from '@/dbutils/axios';

interface UpdateUserParams {
  userId: string;
  fullName: string;
  email: string;
  address: string;
}

export const updateUser = async ({ userId, fullName, email, address }: UpdateUserParams) => {
  try {
    const userData = {
      fullName,
      email,
      address,
    };
    const response = await axios.put(`/secure/customers/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Operation failed: ', error);
    throw new Error('Operation failed. Please try again.');
  }
};
