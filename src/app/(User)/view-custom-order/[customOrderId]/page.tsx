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
          Confirmation
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to cancel this order?
        </p>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-150 ease-in-out"
          onClick={onCancel}
        >
          Cancel
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
      const socket = new SockJS("https://api.hephaestus.store/custom-order-chat");
      client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
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
        const checkoutUrl = await checkOutCustomOrder(
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
      console.error("Fail to delete", error);
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
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center w-full font-nunito text-gray-800">
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
                        {
                          userData? new Date(userData.customer.registeredDate
                        ).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }) : "No data"}
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
                    onClick={handleCancelClick}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
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
                  onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
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
