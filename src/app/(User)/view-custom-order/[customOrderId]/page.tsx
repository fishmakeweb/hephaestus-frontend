"use client";
import React, { useState, useEffect } from "react";
import { Profile } from "@/app/(User)/profile/user-profile-show";
import { fetchProfile } from "@/dbutils/userAPI/showprofile";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CustomOrderData,
  fetchCusOrder,
} from "@/dbutils/customAPI/customOrder";
import AuthService from "@/dbutils/userAPI/authservice";
import { useParams } from "next/navigation";
import {
  deleteCusOrder,
  requestCancelCusOrder,
} from "@/dbutils/customAPI/customOrder";
import { CustomOrderChatMessage } from "@/dbutils/chatAPI/custom-types";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "@/dbutils/axiosAuth";
import { useRouter } from "next/navigation";
import { checkOutCustomOrder } from "@/dbutils/cartAPI/cartFunction";
interface NotificationBoxProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-20">
    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Xác nhận
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Bạn có chắc muốn hủy đơn hàng không?
        </p>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out"
          onClick={onConfirm}
        >
          Xác nhận
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out"
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
);

const SelectedCusOrderForm: React.FC = ({}) => {
  const [formData, setFormData] = useState<CustomOrderData | null>(null);
  const [userData, setUserData] = useState<Profile | null>(null);
  const { customOrderId } = useParams<{ customOrderId: string }>();
  const [chatInitialized, setChatInitialized] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatMessages, setChatMessages] = useState<CustomOrderChatMessage[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleCancelClick = () => {
    setShowNotification(true);
  };

  const handleCancelNotification = () => {
    // Simply close the notification box
    setShowNotification(false);
  };
  // const [noti, setNoti] = useState<>();
  useEffect(() => {
    getProfile();
    getCustomOrderDetails();
    fetchChatHistory();
  }, [customOrderId]);

  useEffect(() => {
    console.log("success");
    let client: Client;
    if (chatInitialized) {
      const socket = new SockJS(
        "https://api.hephaestus.store/custom-order-chat"
      );
      client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        onConnect: () => {
          client.subscribe(
            `/topic/custom-orders/${customOrderId}`,
            (message) => {
              const receivedMessage: CustomOrderChatMessage = JSON.parse(
                message.body
              );
              setChatMessages((prevMessages) => [
                ...prevMessages,
                receivedMessage,
              ]);
            }
          );
        },
      });
      client.activate();
      setStompClient(client);
    }

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [chatInitialized, customOrderId]);

  const fetchChatHistory = async () => {
    const response = await axios.get<CustomOrderChatMessage[]>(
      `https://api.hephaestus.store/api/chat/custom-order-history/${customOrderId}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    setChatMessages(response.data);
    if (response.data.length > 0) {
      setChatInitialized(true);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "" && stompClient) {
      const timestamp = new Date().toISOString();
      const username = AuthService.getUserName();
      const chatMessage = {
        message: newMessage.trim(),
        username: username,
        timestamp: timestamp,
      };
      stompClient.publish({
        destination: `/app/custom-order-chat/${customOrderId}`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage("");
    }
  };
  const getProfile = async () => {
    try {
      const data = await fetchProfile();
      console.log("Fetched profile data:", data);
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (customOrderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const checkoutUrl = await checkOutCustomOrder(token, customOrderId);
        window.location.href = checkoutUrl;
      } else {
        console.error("No token found");
        throw new Error("No token found");
      }
    } catch (error) {
      console.error("Failed to create payment link", error);
      setError("Failed to create payment link");
      alert("Failed to create payment link");
    }
  };

  const handleConfirmCancel = async (cusOrderId: number, statusId: number) => {
    try {
      if (statusId === 2) {
        await deleteCusOrder(cusOrderId);
        router.push("/view-custom-order");
        window.location.reload();
      } else if (statusId === 3) {
        await requestCancelCusOrder(cusOrderId);
      }
    } catch (error) {
      console.error("Lỗi xóa", error);
    }
    console.log("Confirmed cancellation");
    setShowNotification(false);
    // Additional actions after confirmation can be placed here, such as:
    router.push("/view-custom-order");
  };

  const getCustomOrderDetails = async () => {
    const data = await fetchCusOrder(parseInt(customOrderId));
    setFormData(data);
  };

  useEffect(() => {
    getCustomOrderDetails();
    getProfile();
  }, [customOrderId]);
  const createOrderTicket = () => {
    setChatInitialized(true);
  };
  if (!formData) {
    return (
      <div className="flex flex-col h-full mt-10 lg:mt-28 mr-5 lg:mr-28">
        <div className="mb-10 flex flex-col items-center justify-center w-full font-nunito text-slate-600">
          <section className="max-w-full lg:max-w-[968px] w-full mx-4 flex items-center justify-center">
            <p className="text-xl lg:text-2xl font-semibold text-gray-700">
              Chọn đơn hàng để xem chi tiết
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 h-full lg:mt-8 mr-5 lg:mr-28 relative">
      <ScrollArea className="max-h-[500px] lg:max-h-[615px] overflow-auto">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center w-full font-nunito text-gray-800">
          <section className="max-w-full lg:max-w-4xl w-full">
            <div className="mb-5">
              <h1 className="text-2xl font-semibold text-gray-800">
                Chi tiết đơn hàng
              </h1>
              {!chatInitialized && (
                <button
                  className="mt-2 bg-gray-800 hover:bg-black text-white font-bold py-1 px-3 rounded ml-auto"
                  onClick={createOrderTicket}
                >
                  Yêu cầu hỗ trợ
                </button>
              )}
            </div>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-800">
                Thông tin cá nhân
              </h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="bg-gray-50 p-4 rounded-lg shadow w-full ">
                  <dl className="text-gray-800">
                    <div className="py-2">
                      <dt className="text-md text-black">
                        <strong>Họ và tên</strong>
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.fullName}
                      </dd>
                    </div>
                    <div className="py-2">
                      <dt className="text-md text-black">
                        <strong>Email</strong>
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.email}
                      </dd>
                    </div>
                    <div className="py-2">
                      <dt className="text-md text-black">
                        <strong>Địa chỉ</strong>
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.address}
                      </dd>
                    </div>
                    <div className="py-2">
                      <dt className="text-md text-black">
                        <strong>Ngày đăng kí</strong>
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData
                          ? new Date(
                              userData.customer.registeredDate
                            ).toLocaleString("vi-VN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                          : "Không có dữ liệu"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-800">
                Thông tin sản phẩm
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow divide-y divide-gray-200">
                <div className="space-y-3">
                  <p className="text-md text-black">
                    <strong>Loại:</strong>{" "}
                    {formData.customJewelry.category.categoryName}
                  </p>
                  <p className="text-md text-black">
                    <strong>Chất liệu:</strong>{" "}
                    {formData.customJewelry.material.materialName}
                  </p>
                  <p className="text-md text-black">
                    <strong>Hình dáng:</strong>{" "}
                    {formData.customJewelry.shape.shapeDescription}
                  </p>
                  {formData.customJewelry.diamond !== null && (
                    <p className="text-md text-black">
                      <strong>Kim cương:</strong>{" "}
                      {formData.customJewelry.diamond.cut.cutDescription}
                    </p>
                  )}
                  <p className="text-md text-black">
                    <strong>Size:</strong>{" "}
                    {formData.customJewelry.size.sizeNumber}{" "}
                    {formData.customJewelry.size.unit}
                  </p>
                  <p className="text-md text-black">
                    <strong>Giá tiền:</strong> 
                    {formData.customJewelry.price} VNĐ
                  </p>
                  <p className="text-md text-black">
                    <strong>Ghi chú:</strong> {formData.customJewelry.note}
                  </p>
                </div>
              </div>
            </div>

            {formData.orderStatus.statusId !== 4 && (
              <div className="flex justify-between mt-6">
                {formData.orderStatus.statusId !== 3 && (
                  <button
                    onClick={() => handleSubmit(formData.customOrderId)}
                    className="bg-black hover:bg-gray-700 transition duration-300 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Thanh toán trước
                  </button>
                )}
                {formData.description !== "REQUEST CANCEL" && (
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Hủy
                  </button>
                )}
                {showNotification && (
                  <NotificationBox
                    onConfirm={() =>
                      handleConfirmCancel(
                        formData.customOrderId,
                        formData.orderStatus.statusId
                      )
                    }
                    onCancel={handleCancelNotification}
                  />
                )}
              </div>
            )}
          </section>
          {chatInitialized && (
            <div className="mt-4 bg-white shadow-lg rounded-lg p-1 sm:p-2 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl mx-auto">
              <h3 className="text-lg font-semibold mb-1 sm:mb-2">Hỗ trợ</h3>
              <div className="chat-box border border-gray-300 rounded-lg p-1 sm:p-2 max-h-60 overflow-auto">
                <ul className="space-y-1 sm:space-y-2">
                  {chatMessages.map((msg) => (
                    <li key={msg.id} className="break-words">
                      <strong>{msg.username}:</strong> {msg.message}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 sm:mt-3 flex space-x-1 sm:space-x-2 w-full">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-1 sm:p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
                  onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
                />
                <button
                  onClick={sendMessage}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded transition-colors duration-150 ease-in-out"
                >
                  Gửi
                </button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SelectedCusOrderForm;
