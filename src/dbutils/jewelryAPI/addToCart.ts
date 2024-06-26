import axios from "@/dbutils/axios";

export const addToCart = async (productId: string, token: string) => {
  try {
    await axios.post(
      '/order_details/addToCart',
      null,
      {
        params: { productId },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};
