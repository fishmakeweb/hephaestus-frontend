import axios from "@/dbutils/axios";
import { Diamond } from "@/app/(Home)/diamond/diamond-table";
export interface Category {
    categoryId:number;
    categoryName:string;
}

export interface Material {
    materialId:number;
    materialName:string;
}
export interface Size {
    sizeId:number;
    type:string;
    sizeNumber:number;
    unit:string;
}

export interface Shape {
    shapeId: number;
    shapeDescription: string;
}

interface CustomJewelry {
    id: number;
    category: Category;
    material: Material;
    diamond: Diamond | null;
    shape: Shape;
    size: Size;
    price: number;
    note: string;
}


interface OrderStatus {
  statusId: number;
  statusDescription: string;
}

export interface CustomOrderData {
  customOrderId: number;
  username: string;
  orderStatus: OrderStatus;
  customJewelry: CustomJewelry;
  prepaid: number;
  fullpaid: number;
  description: string;
  startDate: string;
  finishDate: string;
}

const getToken = () => sessionStorage.getItem("token");

export const fetchOrder = async (): Promise<CustomOrderData[]> => {
  const token = getToken();
  const response = await axios.get<CustomOrderData[]>("/custom-orders/getcustomorder", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createCustomOrder = async (customJewelry : CustomJewelry) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error("No token found in session storage");
    }

    const response = await axios.post("/custom-orders/create-customorder", customJewelry, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Assuming your API returns some data
  } catch (error) {
    console.error("Error creating custom order:", error);
    throw error; // Propagate the error
  }
};

export const fetchCusOrder = async (customOrderId: number): Promise<CustomOrderData> => {
  const response = await axios.get<CustomOrderData>(`/custom-orders/${customOrderId}`);
  return response.data;
};

export const deleteCusOrder = async (customOrderId: number) =>{
  const token = getToken();
  try {
    await axios.delete(`/custom-orders/${customOrderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Failed to del: ", error)
  }
  
}

export const requestCancelCusOrder = async (customOrderId: number) =>{
  const token = getToken();
  try {
    await axios.put(`/custom-orders/request-cancel/${customOrderId}`,{}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Failed to request cancel: ", error)
  }
  
}

