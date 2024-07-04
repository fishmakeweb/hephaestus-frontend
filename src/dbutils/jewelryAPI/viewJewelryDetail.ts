import axios from "@/dbutils/axios";

export interface JewelryDetail {
  jewelryId: string;
  img: string;
  name: string;
  price: number;
  shape?: {shapeDescription: string}
  material?: { materialName: string };
  category?: { categoryName: string };
  gemstone?: { gemstoneName: string };
  size?: { sizeNumber: number; unit: string };
}

export const viewJewelryDetails = async (productId: string): Promise<JewelryDetail> => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data.jewelry as JewelryDetail; // Assuming response.data directly contains jewelry details
  } catch (error) {
    console.error("Error fetching jewelry details:", error);
    throw error;
  }
};
