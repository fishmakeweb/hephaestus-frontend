"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
import { useRouter } from "next/navigation";
import { createCustomOrder } from "@/dbutils/customAPI/customOrder";
import { ScrollArea } from "@/components/ui/scroll-area";
interface PriceFormProps {
  jewelry: Jewelry | null;
  onBack: () => void; // Add onBack prop
}

export default function PriceForm({ jewelry, onBack }: PriceFormProps) {
  const router = useRouter();

  const handleSave = async (jewelry: Jewelry) => {
    try {
      // Then, create the custom order after the jewelry is successfully saved
      const orderResponse = await createCustomOrder(jewelry);
      console.log(orderResponse);

      // Navigate to the view custom order page
      router.push("/view-custom-order");
    } catch (error) {
      console.error("Error in handling save operation:", error);
      // Handle the error appropriately, e.g., show a notification to the user
    }
  };

  return (
    <>
      <button className="bg-white hover:bg-gray-300 transition duration-300 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={onBack}>←</button>
      <ol className="flex items-center w-full mb-4 sm:mb-5">
        <li className="flex w-full items-center text-green-600 dark:text-green-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-800">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
              <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
          </div>
        </li>
        
        <li className="flex items-center w-full">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-700 shrink-0">
            <svg
              className="w-4 h-4 text-green-600 lg:w-6 lg:h-6 dark:text-green-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
            </svg>
          </div>
        </li>
      </ol>
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-3xl">
        Sản phẩm chế tác của bạn
      </h1>
      <ScrollArea className="max-h-[550px] lg:max-h-[620px] overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-4">
          <Card className="w-full max-w-md mx-auto my-4 lg:my-8 bg-white rounded-lg shadow-md">
            <CardBody className="flex flex-col gap-2">
              <p className="text-md font-semibold">Loại: "{jewelry?.category.categoryName}"</p>
              <p className="text-md font-semibold">Chất liệu: "{jewelry?.material.materialName}"</p>
              <p className="text-md font-semibold">Hình dáng: "{jewelry?.shape.shapeDescription}"</p>
              <p className="text-md font-semibold">Loại đá: {jewelry?.diamond?.cut.cutDescription}</p>
              <p className="text-md font-semibold">
                Size: {jewelry?.size.sizeNumber} {jewelry?.size.unit} ({jewelry?.size.type})
              </p>
            </CardBody>
          </Card>
        </div>
      </ScrollArea>
      <Card>
        <CardBody className="items-center">
          <p className="max-w-md text-center">
            Giá tiền ước tính: {jewelry?.price !== undefined ? `${jewelry.price} VNĐ` : "Calculating..."}
          </p>
          <div className="mt-4">
            <button
              className="bg-black text-white px-20 py-3 rounded-full hover:bg-gray-800"
              onClick={() => handleSave(jewelry!)}
            >
              Lưu
            </button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
