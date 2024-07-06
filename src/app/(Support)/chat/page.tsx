"use client";
// pages/chat.tsx
// pages/Chat.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";
import { ChatMessage, OrderChatMessage } from "./types"; // Adjust the import path as necessary
import AuthService from "@/dbutils/userAPI/authservice";

const Chat = () => {
  const [messages, setMessages] = useState<OrderChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("https://api.hepheathus.store/chat");
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      onConnect: () => {
        console.log("Connected to the WebSocket server.");
        client.subscribe(`/topic/orders/8`, (message) => {
          const receivedMessage: OrderChatMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      debug: (str) => {
        console.log(str);
      },
    });

    client.activate();
    setStompClient(client);
    fetchChatHistory();

    return () => {
      client.deactivate();
    };
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get<OrderChatMessage[]>(
        "https://api.hepheathus.store/api/chat/history/8",
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "" && stompClient) {
      const timestamp = new Date().toISOString();
      const username = AuthService.getUserName(); // Assume this returns a string directly.
      const chatMessage = {
        message: newMessage.trim(),
        username: username,
        timestamp: timestamp,
      };
      console.log("Sending message:", chatMessage);

      stompClient.publish({
        destination: `/app/chat/8`,
        body: JSON.stringify(chatMessage),
      });

      setNewMessage(""); // Clear the input after sending
    }
  };

  return (
    <div>
      <h2>Chat for Order ID 8</h2>
      {messages.map((msg) => (
        <div key={msg.id}>
          <p>
            {msg.username}: {msg.message}
          </p>
        </div>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
