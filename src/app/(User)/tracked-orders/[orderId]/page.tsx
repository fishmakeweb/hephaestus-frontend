'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { OrderDetail } from '@/dbutils/userAPI/order';
import { Profile } from '@/app/(User)/profile/user-profile-show';
import React, { useState, useEffect } from 'react';
import { fetchProfile } from '@/dbutils/userAPI/showprofile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchOrderDetail, OrderData, fetchOrder } from '@/dbutils/userAPI/order';
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Client } from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { OrderChatMessage } from '@/dbutils/chatAPI/types';
import AuthService from '@/dbutils/userAPI/authservice';

import axios from 'axios';

const TrackedOrderCard: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [formData, setFormData] = useState<OrderDetail[]>([]);
    const [userData, setUserData] = useState<Profile | null>(null);
    const [orderData, setOrderData] = useState<OrderData[]>([]);
    const [chatMessages, setChatMessages] = useState<OrderChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        getProfile();
        fetchData();
        getOrderDetails();
        const socket = new SockJS("https://api.hephaestus.store/chat");
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            onConnect: () => {
                client.subscribe(`/topic/orders/${orderId}`, (message) => {
                    const receivedMessage: OrderChatMessage = JSON.parse(message.body);
                    setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
    
            },
        });
        client.activate();
        setStompClient(client);
        fetchChatHistory();
        return () => {
            client.deactivate();
          };
    }, [orderId]);

    const getProfile = async () => {
        const data = await fetchProfile();
        setUserData(data);
    };

    const fetchData = async () => {
        const data = await fetchOrder();
        setOrderData(data);
    };

    const getOrderDetails = async () => {
        const data = await fetchOrderDetail(parseInt(orderId));
        setFormData(data);
    };

    const fetchChatHistory = async () => {
        const response = await axios.get<OrderChatMessage[]>(
            `https://api.hephaestus.store/api/chat/history/${orderId}`,
            { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } }
        );
        setChatMessages(response.data);
        console.log(response.data);
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

            setNewMessage(''); // Clear the input after sending
        }
    };


    return (
        <main className="bg-gray-100 flex flex-col lg:flex-row lg:space-x-4 p-4">
            {orderData.length === 0 ? (
                <div className="flex flex-col h-full mt-10 lg:mt-28 mr-5 lg:mr-28">
                    <div className="mb-10 flex flex-col items-center justify-center w-full font-nunito text-slate-600">
                        <section className="max-w-full lg:max-w-[968px] w-full mx-4 flex items-center justify-center">
                            <p className="text-xl lg:text-2xl font-semibold text-gray-700">
                                You don&apos;t have an order yet
                            </p>
                        </section>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-1/3">
                        <p className="text-xl text-center font-semibold mb-4">Your Orders:</p>
                        <ScrollArea className="max-h-[550px] lg:max-h-[620px] overflow-y-auto">
                            <div className="flex flex-wrap justify-center gap-4">
                                {orderData.map((order) => (
                                    <Card
                                        key={order.orderId}
                                        className="w-full bg-white rounded-lg shadow-md"
                                    >
                                        <CardHeader className="flex gap-3">
                                            <div className="flex flex-col">
                                                <p className="text-md font-semibold">Order ID: {order.orderId}</p>
                                                <p className="text-sm text-default-500">Date: {order.orderDate}</p>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <p className="text-lg font-semibold">Status: {order.orderStatus.statusDescription}</p>
                                            <p className="text-lg font-semibold">Total Price: ${order.totalPrice}</p>
                                        </CardBody>
                                        <Divider />
                                        <CardFooter>
                                            <Link
                                                href={'/tracked-orders/' + order.orderId}
                                                className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded"
                                            >
                                                View Details
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="flex-1 p-4">
                        <div className="flex flex-col mt-4 h-full lg:mt-8 mr-5 lg:mr-28 relative">
                            <ScrollArea className="max-h-[500px] lg:max-h-[615px] overflow-y-auto w-full">
                                <div className="bg-white py-3 px-3 rounded-lg mb-8 flex flex-col items-center justify-center w-full font-nunito text-slate-600">
                                    <section className="max-w-full lg:max-w-[720px] w-full mx-4">
                                        <div className="flex justify-between items-center">
                                            <h1 className="my-2 text-xl font-semibold sm:text-2xl">Order Review</h1>
                                            {chatMessages.length === 0 && (
                                                <button className="mt-2 bg-gray-800 hover:bg-black text-white font-bold py-1 px-3 rounded ml-auto">
                                                    Create an order ticket
                                                </button>
                                            )}
                                        </div>
                                        <div className="w-full mt-3 mb-3">
                                            <h2 className="text-lg font-bold my-2">Customer Information</h2>
                                            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                <div className="w-full">
                                                    <dl className="text-black divide-y divide-gray-200">
                                                        <div className="flex flex-col py-2">
                                                            <dt className="mb-1 text-gray-500 text-md">Full Name</dt>
                                                            <dd className="text-md font-medium text-gray-900">{userData?.customer.fullName}</dd>
                                                        </div>
                                                        <div className="flex flex-col pt-2">
                                                            <dt className="mb-1 text-gray-500 text-md">Email</dt>
                                                            <dd className="text-md font-medium text-gray-900">{userData?.customer.email}</dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                                <div className="w-full">
                                                    <dl className="text-black divide-y divide-gray-200">
                                                        <div className="flex flex-col py-2">
                                                            <dt className="mb-1 text-gray-500 text-md">Address</dt>
                                                            <dd className="text-md font-medium text-gray-900">{userData?.customer.address}</dd>
                                                        </div>
                                                        <div className="flex flex-col pt-2">
                                                            <dt className="mb-1 text-gray-500 text-md">Registered Date</dt>
                                                            <dd className="text-md font-medium text-gray-900">{userData ? new Date(userData.customer.registeredDate).toLocaleDateString() : ''}</dd>
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
                                                            src={detail.product.jewelry.img}
                                                            alt={detail.product.jewelry.name}
                                                            className="w-20 h-20 rounded-md object-cover"
                                                        />
                                                        <div className="ml-3 flex-grow">
                                                            <p className="text-md font-medium text-gray-900">{detail.product.jewelry.name}</p>
                                                            <p className="text-sm text-gray-500">Price: ${detail.product.jewelry.price.toFixed(2)}</p>
                                                            <p className="text-sm text-gray-500">Quantity: {detail.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-full pb-3 mb-2">
                                            <div className="flex justify-between items-center">
                                                <p className="text-md font-semibold">Total:</p>
                                                <p className="text-md font-semibold mr-2">${formData.reduce((total, detail) => total + detail.product.jewelry.price * detail.quantity, 0).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <p className='text-md font-semibold'>
                                            Support Box
                                        </p>
                                        <div className="chat-box">
                                            <div className="messages">
                                                {chatMessages.map(msg => (
                                                    <p key={msg.id}>{msg.username}: {msg.message}</p>
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
                                    </section>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}

export default TrackedOrderCard;