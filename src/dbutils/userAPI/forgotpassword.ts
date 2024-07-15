// forgot-passwordAPI.ts
import axios from "@/dbutils/axios";

/**
 * Sends a password reset request to the server using Axios.
 * @param email User's email to send the reset link to.
 */
async function sendForgotPasswordRequest(email: string): Promise<string> {
  try {
    const response = await axios.post('/public/forgot_password', { email });
    return response.data; // Assuming the server sends back a success message
  } catch (error: any) {
    // Handle errors in Axios requests
    throw new Error(error.response?.data?.message || 'Failed to send reset password link');
  }
}

export default sendForgotPasswordRequest;
