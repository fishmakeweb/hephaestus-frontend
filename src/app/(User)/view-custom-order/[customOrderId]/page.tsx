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
import axios from "@/dbutils/axios";
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
  //   const useRouter = useRouter();

  useEffect(() => {
    getProfile();
    getCustomOrderDetails();
    fetchChatHistory();
  }, [customOrderId]);

  useEffect(() => {
    console.log("success");
    let client: Client;
    if (chatInitialized) {
      const socket = new SockJS("http://localhost:8080/custom-order-chat");
      client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        onConnect: () => {
          client.subscribe(`/topic/custom-orders/${customOrderId}`, (message) => {
            const receivedMessage: CustomOrderChatMessage = JSON.parse(message.body);
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
  }, [chatInitialized, customOrderId]);



  const fetchChatHistory = async () => {
    const response = await axios.get<CustomOrderChatMessage[]>(
      `http://localhost:8080/api/chat/custom-order-history/${customOrderId}`,
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
      const token = sessionStorage.getItem("token");
      if (token) {
        const checkoutUrl = await AuthService.checkOutCustomOrder(
          token,
          customOrderId
        );
        window.location.href = checkoutUrl;
      } else {
        console.error("No token found");
        throw new Error("No token found");
      }
    } catch (error) {
      alert("Failed to create payment link:" + error);
      throw new Error("Failed to create payment link");
    }
  };

  const handleCancel = async (cusOrderId: number, statusId: number) => {
    try {
      if (statusId === 2) {
        await deleteCusOrder(cusOrderId);
      } else if (statusId === 3) {
        await requestCancelCusOrder(cusOrderId);
      }
    } catch (error) {
      console.error("Fail to delete", error);
    }
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
              Select an order to display details
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 h-full lg:mt-8 mr-5 lg:mr-28 relative">
      <ScrollArea className="max-h-[500px] lg:max-h-[615px] overflow-auto">
        <div className="bg-white p-6 rounded-lg shadow mt-6 flex flex-col items-center justify-center w-full font-nunito text-gray-800">
          <section className="max-w-full lg:max-w-4xl w-full">
            <div className="mb-5">
              <h1 className="text-2xl font-semibold text-gray-800">
                Custom Order Review
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
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-800">
                Customer Information
              </h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <dl className="text-gray-800 divide-y divide-gray-200">
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Full Name
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.fullName}
                      </dd>
                    </div>
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Email
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.email}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <dl className="text-gray-800 divide-y divide-gray-200">
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Address
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.address}
                      </dd>
                    </div>
                    <div className="py-2">
                      <dt className="text-sm font-semibold text-gray-600">
                        Registered Date
                      </dt>
                      <dd className="mt-1 text-md font-medium">
                        {userData?.customer.registeredDate}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-800">
                Custom Jewelry Info
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg shadow divide-y divide-gray-200">
                <div className="py-3 flex flex-wrap items-start gap-4">
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Category: {formData.customJewelry.category.categoryName}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Material: {formData.customJewelry.material.materialName}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Shape: {formData.customJewelry.shape.shapeDescription}
                    </p>
                  </div>
                  {formData.customJewelry.diamond !== null && (
                    <div className="flex-grow flex items-center gap-2">
                      <p className="text-md text-black">
                        Diamond:{" "}
                        {formData.customJewelry.diamond.cut.cutDescription}
                      </p>
                    </div>
                  )}
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Size: {formData.customJewelry.size.sizeNumber}{" "}
                      {formData.customJewelry.size.unit}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Price: ${formData.customJewelry.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-md text-black">
                      Your Note: {formData.customJewelry.note}
                    </p>
                  </div>
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
                    Checkout
                  </button>
                )}
                {formData.description !== "REQUEST CANCEL" && (
                  <button
                    onClick={() =>
                      handleCancel(
                        formData.customOrderId,
                        formData.orderStatus.statusId
                      )
                    }
                    className="bg-red-500 hover:bg-red-700 transition duration-300 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                )}               
              </div>
            )}
          </section>
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
        </div>
      </ScrollArea>
    </div>
  );
};

export default SelectedCusOrderForm;
