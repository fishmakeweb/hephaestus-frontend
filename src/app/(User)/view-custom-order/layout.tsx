"use client";

import React, { useState, useEffect } from "react";
import CusOrderCards from "./view-custom-form";
import { CustomOrderData } from "@/dbutils/customAPI/customOrder";
import { fetchOrder } from "@/dbutils/customAPI/customOrder";

export default function CustomOrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [customOrderData, setCustomOrderData] = useState<CustomOrderData[]>([]);
useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await fetchOrder();
          console.log("Fetched order data:", data);
          setCustomOrderData(data);
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      };
  fetchData();
}, []);
  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row lg:space-x-4 p-4">
      {customOrderData.length === 0 ? (
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
            <p className="text-xl text-center font-semibold mb-4">
              Your Orders:
            </p>
            <CusOrderCards customOrderData={customOrderData} />
          </div>
          <div className="flex-grow">{children}</div>
        </>
      )}
    </div>
  );
}
