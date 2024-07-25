// app/order-confirmation/order-confirm-form.tsx
"use client";
import React, { useEffect, useState } from "react";
import AuthService from "@/dbutils/userAPI/authservice";
import { fetchCart , ItemDetails,checkOut} from "@/dbutils/cartAPI/cartFunction";

interface Profile {
  customer: {
    userId: string;
    fullName: string;
    email: string;
    address: string;
    username: string;
    registeredDate: string;
  };
}


const ConfirmOrderForm: React.FC = () =>  {
  const [itemDetails, setItemDetails] = useState<ItemDetails[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [totalAmount,setTotalAmount] = useState<number>(0);
  const [orderId, setOrderId] = useState<number>();

  useEffect(() => {
    fetchProfile();
    fetchCartData();
  }, []);

 
  const fetchCartData = async () => {
    try {
      const data = await fetchCart();
      console.log(data);
      if (data.listOrderDetail.length !== 0) setOrderId(data.listOrderDetail[0].id);

      const items = data.listOrderDetail.map((item: any) => ({
        ...item.jewelry,
        orderDetailId: item.id,
        quantity: item.quantity,
      }));

      setItemDetails(items);

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  
  const fetchProfile = async () => {
    try {
      const data = await AuthService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  if (!profile || !itemDetails) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const checkoutUrl = await checkOut();
          window.location.href = checkoutUrl;
        } else {
          console.error('No token found');
          throw new Error('No token found');
        }
      } catch (error) {
        alert('Failed to create payment link:'+ error);
        throw new Error('Failed to create payment link');
      }
  };

  const { fullName, email, address, registeredDate } = profile.customer;

  return (
    <div className="flex flex-col bg-white">
      <div className="flex items-center justify-center min-h-screen font-nunito text-slate-600">
        <section className="max-w-[968px] w-full mx-4 shadow-lg">
          <h1 className="mx-2 my-10 text-2xl font-semibold sm:text-3xl">
            Chi tiết đơn hàng
          </h1>
          <div className="w-full bg-white p-8 rounded-lg shadow-[0px_10px_15px_9px_#DDE4F1] mb-10">
            <h2 className="text-xl font-[800] mb-4">Sản phẩm</h2>
            <div className="divide-y divide-gray-200 w-full">
              {itemDetails.map((item) => (
                <div key={item.orderDetailId} className="py-4 flex items-center">
                  <img
                    loading="lazy"
                    src={item.img}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <p className="text-lg font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Giá tiền: {item.price} VNĐ</p>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{(item.price * item.quantity)} VNĐ</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-white p-8 rounded-lg shadow-[0px_10px_15px_9px_#DDE4F1] mb-10">
            <h2 className="text-xl font-[800] mb-4">Thông tin cá nhân</h2>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <div className="w-full">
                <dl className="text-black divide-y divide-gray-200">
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Họ và tên</dt>
                    <dd className="text-lg font-semibold">{fullName}</dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Email</dt>
                    <dd className="text-lg font-semibold">{email}</dd>
                  </div>
                </dl>
              </div>
              <div className="w-full">
                <dl className="text-black divide-y divide-gray-200">
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Địa chỉ</dt>
                    <dd className="text-lg font-semibold">{address}</dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg">Ngày đăng kí</dt>
                    <dd className="text-lg font-semibold">{new Date(registeredDate).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-8 rounded-lg shadow-[0px_10px_15px_9px_#DDE4F1] mb-10">
            <h2 className="text-xl font-[800] mb-4">Tổng kết</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg">Tổng giá tiền</p>
              <p className="text-lg font-semibold">{totalAmount} VNĐ</p>
            </div>
          </div>
          <button
            className="w-full bg-black mb-5 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Thanh toán
          </button>
        </section>
      </div>
    </div>
  );
};

export default ConfirmOrderForm;
