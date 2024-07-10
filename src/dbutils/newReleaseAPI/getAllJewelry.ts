
import axios from '@/dbutils/axios';

export const getAllNewRelease = async (page_number: number = 0) => {
  try {
    const response = await axios.get(`s/new-release`, { params: { page: page_number } });
    console.log(response.data);
    return response.data; // The API now returns the entire Page object including content and metadata
  } catch (error) {
    console.error("Error fetching jewelry data:", error);
    throw error;
  }
};
