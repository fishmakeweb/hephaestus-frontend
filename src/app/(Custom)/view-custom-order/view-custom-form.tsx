import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { CustomOrderData } from "@/dbutils/customAPI/customOrder";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderCardsProps {
    customOrderData: CustomOrderData[];
    onItemClick: (customOrder: number) => void;
}

const CusOrderCards: React.FC<OrderCardsProps> = ({ customOrderData, onItemClick }) => {
    const handleItemClick = (orderId: number) => {
        onItemClick(orderId);
    };

    if (!customOrderData) {
        return <div>Loading...</div>;
    }

    return (
        <ScrollArea className="max-h-[550px] lg:max-h-[620px]">
            {customOrderData.map((customOrder) => (
                <Card key={customOrder.customOrderId} className="mx-4 py-2 my-4 lg:my-8 max-w-full lg:max-w-[400px] bg-white rounded-lg shadow-md">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-md font-semibold">Custom Order ID: {customOrder.customOrderId}</p>
                            <p className="text-md font-semibold">Start Date: {customOrder.startDate}</p>           
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-lg font-semibold">Status: {customOrder.description}</p>
                        <p className="text-lg font-semibold">Prepaid: ${customOrder.prepaid}</p>
                        <p id = "fullPaid" className="text-lg font-semibold">Fullpaid: ${customOrder.fullpaid}</p>
                        <label htmlFor="fullPaid">This price can change in the future</label>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <button className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded" onClick={() => handleItemClick(customOrder.customOrderId)}>
                            View Details
                        </button>
                    </CardFooter>
                </Card>
            ))}
        </ScrollArea>
    );
};

export default CusOrderCards;
