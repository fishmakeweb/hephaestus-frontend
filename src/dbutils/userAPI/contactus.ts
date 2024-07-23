import axios from "@/dbutils/axios";  // Adjust the import path as needed

interface ContactDTO {
  name: string;
  email: string;
  message: string;
}

async function sendContactUs(contactDTO: ContactDTO): Promise<string> {
  try {
    const response = await axios.post('/public/contact-us', contactDTO);
    return response.data; // Assuming the server sends back a success message
  } catch (error: any) {
    // Handle errors in Axios requests
    throw new Error(error.response?.data?.message || 'Failed to send message');
  }
}

export default sendContactUs;
