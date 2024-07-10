import axios from "@/dbutils/axios";

export const addToCart = async (jewelryId: string, token: string) => {
  try {
    await axios.post(
      '/order_details/addToCart',
      null,
      {
        params: { jewelryId },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};
