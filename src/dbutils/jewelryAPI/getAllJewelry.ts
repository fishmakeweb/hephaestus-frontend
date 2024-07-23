import axios from '@/dbutils/axios';

export const getAllJewelry = async (page_number: number,filterParam:string) => {
  try {
    const response = await axios.get(`/public/jewelry?page=${page_number }`+filterParam);
    // console.log(response.data);
    return response.data; // The API now returns the entire Page object including content and metadata
  } catch (error) {
    console.error("Error fetching jewelry data:", error);
    throw error;
  }
};
