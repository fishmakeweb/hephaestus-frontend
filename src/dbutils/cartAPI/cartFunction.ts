import axios from "@/dbutils/axios";

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
  const token = getToken();
  const response = await axios.get<CartData>("/orders/getcart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.data);
  return response.data;
};

export const updateQuantity = async (orderDetailId: number, quantity: number) => {
  const token = getToken();
  await axios.post(
    `/order_details/updateQuantity`,
    null,
    {
      params: { orderDetailId, quantity },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
