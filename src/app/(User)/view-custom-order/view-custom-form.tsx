import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { CustomOrderData } from "@/dbutils/customAPI/customOrder";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderCardsProps {
  customOrderData: CustomOrderData[];
}

const CusOrderCards: React.FC<OrderCardsProps> = ({ customOrderData }) => {
  if (!customOrderData) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="max-h-[550px] lg:max-h-[620px] overflow-y-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {customOrderData.map((customOrder) => (
          <Card
            key={customOrder.customOrderId}
            className="w-full max-w-md mx-auto my-4 lg:my-8 bg-white rounded-lg shadow-md"
          >
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div className="flex flex-col">
                <p className="text-md font-semibold">
                  Mã đơn hàng: {customOrder.customOrderId}
                </p>
                <p className="text-md font-semibold">
                  Ngày tiếp nhận:{" "}
                  {new Date(customOrder.startDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-2">
              <p className="text-lg font-semibold">
                Trạng thái: {customOrder.description}
              </p>
              <p className="text-lg font-semibold">
                Thanh toán trước: {customOrder.prepaid} VNĐ
              </p>
              <p id="fullPaid" className="text-lg font-semibold">
                Tổng giá tiền: {customOrder.fullpaid} VNĐ
              </p>
              <label htmlFor="fullPaid">
                Giá này có thể thay đổi trong tương lai
              </label>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end">
              <Link
                href={`/view-custom-order/${customOrder.customOrderId}`}
                className="bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded"
              >
                Xem chi tiết 
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CusOrderCards;
