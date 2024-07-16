"use client";
import { useParams } from "next/navigation";
import { OrderDetail } from "@/dbutils/userAPI/order";
import { Profile } from "@/app/(User)/profile/user-profile-show";
import React, { useState, useEffect } from "react";
import { fetchProfile } from "@/dbutils/userAPI/showprofile";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchOrderDetail,
} from "@/dbutils/userAPI/order";
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
          Authorization: "Bearer " + sessionStorage.getItem("token"),
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
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
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
    <div className="bg-gray-100 flex flex-col lg:flex-row lg:space-x-4">
      <div className="flex-1">
        <div className="flex flex-col h-full lg:mt-8 mr-5 lg:mr-28 relative">
          <ScrollArea className="max-h-[500px] lg:max-h-[615px] overflow-y-auto w-full">
            <div className="bg-white py-3 px-3 rounded-lg mb-8 flex flex-col items-center justify-center w-full font-nunito text-slate-600">
              <section className="max-w-full lg:max-w-[720px] w-full mx-4">
                <div className="flex justify-between items-center">
                  <h1 className="my-2 text-xl font-semibold sm:text-2xl">
                    Order Review
                  </h1>
                  {!chatInitialized && (
                    <button
                      className="mt-2 bg-gray-800 hover:bg-black text-white font-bold py-1 px-3 rounded ml-auto"
                      onClick={createOrderTicket}
                    >
                      Create an order ticket
                    </button>
                  )}
                </div>
                <div className="w-full mt-3 mb-3">
                  <h2 className="text-lg font-bold my-2">
                    Customer Information
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <div className="w-full">
                      <dl className="text-black divide-y divide-gray-200">
                        <div className="flex flex-col py-2">
                          <dt className="mb-1 text-gray-500 text-md">
                            Full Name
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
                            Address
                          </dt>
                          <dd className="text-md font-medium text-gray-900">
                            {userData?.customer.address}
                          </dd>
                        </div>
                        <div className="flex flex-col pt-2">
                          <dt className="mb-1 text-gray-500 text-md">
                            Registered Date
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
                  <h2 className="text-lg font-bold my-2">List of items:</h2>
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
                            Price: ${detail.jewelry.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {detail.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full pb-3 mb-2">
                  <div className="flex justify-between items-center">
                    <p className="text-md font-semibold">Total:</p>
                    <p className="text-md font-semibold mr-2">
                      $
                      {formData
                        .reduce(
                          (total, detail) =>
                            total +
                            detail.jewelry.price * detail.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
                {chatInitialized && (
                  <>
                    <p className="text-md font-semibold">Support Box</p>
                    <div className="chat-box">
                      <div className="messages">
                        {chatMessages.map((msg) => (
                          <p key={msg.id}>
                            {msg.username}: {msg.message}
                          </p>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) =>
                          e.key === "Enter" ? sendMessage() : null
                        }
                      />
                      <button onClick={sendMessage}>Send</button>
                    </div>
                  </>
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
