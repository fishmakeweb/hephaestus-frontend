// reset-password.ts
import axios from '@/dbutils/axios';

interface ResetPasswordData {
    token: string;
    password: string;
}

/**
 * Sends a request to reset the password to the server using Axios.
 * @param data Contains the token and new password.
 */
async function resetPassword(data: ResetPasswordData): Promise<string> {
  try {
    const response = await axios.post('/public/reset_password', data);
    return response.data; // Assuming the server sends back a success message
  } catch (error: any) {
    // Handle errors in Axios requests
    throw new Error(error.response?.data?.message || 'Failed to reset password.');
  }
}

export default resetPassword;
