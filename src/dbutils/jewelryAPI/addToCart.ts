import axios from "@/dbutils/axiosAuth";



export const addToCart = async (jewelryId: number) => {

  try {
    await axios.post(
      `/public/order_details/addToCart?jewelryId=${jewelryId}`
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};
