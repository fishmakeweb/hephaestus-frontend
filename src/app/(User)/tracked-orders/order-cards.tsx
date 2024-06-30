import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { OrderData } from "@/dbutils/userAPI/order";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderCardsProps {
    orderData: OrderData[];
    onItemClick: (order: number) => void;
}

const OrderCards: React.FC<OrderCardsProps> = ({ orderData, onItemClick }) => {
    const handleItemClick = (orderId: number) => {
        onItemClick(orderId);
    };

    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <ScrollArea className="max-h-[550px] lg:max-h-[620px]">
            {orderData.map((order) => (
                <Card key={order.orderId} className="mx-4 py-2 my-4 lg:my-8 max-w-full lg:max-w-[400px] bg-white rounded-lg shadow-md">
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
                        <button className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={() => handleItemClick(order.orderId)}>
                            View Details
                        </button>
                    </CardFooter>
                </Card>
            ))}
        </ScrollArea>
    );
};

export default OrderCards;
