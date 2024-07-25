"use client";
import { useParams } from "next/navigation";
import { OrderDetail } from "@/dbutils/userAPI/order";
import { Profile } from "@/app/(User)/profile/user-profile-show";
import React, { useState, useEffect } from "react";
import { fetchProfile } from "@/dbutils/userAPI/showprofile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchOrderDetail } from "@/dbutils/userAPI/order";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { OrderChatMessage } from "@/dbutils/chatAPI/types";
import AuthService from "@/dbutils/userAPI/authservice";
import axios from "axios";

const TrackedOrderCard: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [formData, setFormData] = useState<OrderDetail[]>([]);
  const [userData, setUserData] = useState<Profile | null>(null);
  const [chatMessages, setChatMessages] = useState<OrderChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatInitialized, setChatInitialized] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    getProfile();
    getOrderDetails();
    fetchChatHistory();
  }, [orderId]);

  useEffect(() => {
    let client: Client;
    if (chatInitialized) {
      const socket = new SockJS("https://api.hephaestus.store/chat");
      client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        onConnect: () => {
          client.subscribe(`/topic/orders/${orderId}`, (message) => {
            const receivedMessage: OrderChatMessage = JSON.parse(message.body);
            setChatMessages((prevMessages) => [
              ...prevMessages,
              receivedMessage,
            ]);
          });
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
  }, [chatInitialized, orderId]);

  const getProfile = async () => {
    const data = await fetchProfile();
    setUserData(data);
  };

  const getOrderDetails = async () => {
    const data = await fetchOrderDetail(parseInt(orderId));
    setFormData(data);
  };

  const fetchChatHistory = async () => {
    const response = await axios.get<OrderChatMessage[]>(
      `https://api.hephaestus.store/api/chat/history/${orderId}`,
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
        destination: `/app/chat/${orderId}`,
        body: JSON.stringify(chatMessage),
      });
      setNewMessage("");
    }
  };

  const createOrderTicket = () => {
    setChatInitialized(true);
  };
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      <div className="flex-1">
        <div className="flex flex-col h-full lg:mt-8 mr-5 lg:mr-28 relative">
          <ScrollArea className="max-h-[500px] lg:max-h-[615px] overflow-y-auto w-full">
            <div className="bg-white py-3 px-3 rounded-lg mb-8 flex flex-col items-center justify-center w-full font-nunito text-slate-600">
              <section className="max-w-full lg:max-w-[720px] w-full mx-4">
                <div className="flex justify-between items-center">
                  <h1 className="my-2 text-xl font-semibold sm:text-2xl">
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
                <div className="w-full mt-3 mb-3">
                  <h2 className="text-lg font-bold my-2">
                    Thông tin cá nhân
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <div className="w-full">
                      <dl className="text-black divide-y divide-gray-200">
                        <div className="flex flex-col py-2">
                          <dt className="mb-1 text-gray-500 text-md">
                            Họ và tên
                          </dt>
                          <dd className="text-md font-medium text-gray-900">
                            {userData?.customer.fullName}
                          </dd>
                        </div>
                        <div className="flex flex-col pt-2">
                          <dt className="mb-1 text-gray-500 text-md">Email</dt>
                          <dd className="text-md font-medium text-gray-900">
                            {userData?.customer.email}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="w-full">
                      <dl className="text-black divide-y divide-gray-200">
                        <div className="flex flex-col py-2">
                          <dt className="mb-1 text-gray-500 text-md">
                            Địa chỉ
                          </dt>
                          <dd className="text-md font-medium text-gray-900">
                            {userData?.customer.address}
                          </dd>
                        </div>
                        <div className="flex flex-col pt-2">
                          <dt className="mb-1 text-gray-500 text-md">
                            Ngày đăng kí
                          </dt>
                          <dd className="text-md font-medium text-gray-900">
                            {userData
                              ? new Date(
                                  userData.customer.registeredDate
                                ).toLocaleDateString()
                              : ""}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-3">
                  <h2 className="text-lg font-bold my-2">Danh sách sản phẩm:</h2>
                  <div className="divide-y divide-gray-200 w-full">
                    {formData.map((detail) => (
                      <div key={detail.id} className="py-3 flex items-center">
                        <img
                          loading="lazy"
                          src={detail.jewelry.img}
                          alt={detail.jewelry.name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="ml-3 flex-grow">
                          <p className="text-md font-medium text-gray-900">
                            {detail.jewelry.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Giá tiền: {detail.jewelry.price} VNĐ
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {detail.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full pb-3 mb-2">
                  <div className="flex justify-between items-center">
                    <p className="text-md font-semibold">Tổng giá tiền:</p>
                    <p className="text-md font-semibold mr-2">
                      {formData
                        .reduce(
                          (total, detail) =>
                            total + detail.jewelry.price * detail.quantity,
                          0
                        )
                        } VNĐ
                    </p>
                  </div>
                </div>
                {chatInitialized && (
                  <div className="mt-4 bg-white shadow-lg rounded-lg p-1 sm:p-2 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl mx-auto">
                    <h3 className="text-lg font-semibold mb-1 sm:mb-2">
                      Hỗ trợ
                    </h3>
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
                        placeholder="Nhập tin nhắn..."
                        className="flex-grow p-1 sm:p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
                        onKeyPress={(e) =>
                          e.key === "Enter" ? sendMessage() : null
                        }
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
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TrackedOrderCard;
