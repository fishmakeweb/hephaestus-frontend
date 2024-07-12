import axios from "@/dbutils/axiosAuth";

export interface ItemDetails {
  orderDetailId: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartData {
  listOrderDetail: {
    id: number;
    quantity: number;
      jewelry: {
        img: string;
        name: string;
        price: number;
      };
  }[];
  totalPrice:number,
}

const getToken = () => sessionStorage.getItem("token");

export const fetchCart = async (): Promise<CartData> => {
  const response = await axios.get<CartData>("/customer/getcart");
  console.log(response.data);
  return response.data;
};

export const updateQuantity = async (orderDetailId: number, quantity: number) => {
  const token = getToken();
  await axios.post(
    `/public/order_details/updateQuantity`,
    null,
    {
      params: { orderDetailId, quantity }
    }
  );
};

export const checkOut = async () => {
  try {
    const response = await axios.get(`/customer/checkOut`);
    return response.data.checkoutUrl;
  } catch (error) {
    throw error;
  }
}