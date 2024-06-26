
import axios from '@/dbutils/axios';

export const getAllJewelry = async (page_number: string | undefined) => {
  try {
    const response = await axios.get(`/products/jewelry/${page_number}`);
    return response.data as { productId: string; img: string; name: string; price: number }[];
  } catch (error) {
    console.error("Error fetching jewelry data:", error);
    throw error;
  }
};
