"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
import { useRouter } from "next/navigation";
import { createCustomOrder } from "@/dbutils/customAPI/customOrder";
export default function PriceForm() {
  const [price, setPrice] = useState<number | null>(null);
  const [jewelry, setJewelry] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const storedJewelry = sessionStorage.getItem("edittingJewelry");
    if (storedJewelry) {
      const jewelryData = JSON.parse(storedJewelry);
      setJewelry(jewelryData);
      setPrice(jewelryData.price);
    }
  }, []);

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
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-3xl">
        Estimated price
      </h1>
      <Card>
        <CardBody className="items-center">
          <p className="max-w-md text-center">
            Total: {price !== null ? `$${price}` : "Calculating..."}
          </p>
          <p className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-xl">
            Current Jewelry: category: {jewelry?.category.categoryName},
            material: {jewelry?.material.materialName}, diamond:{" "}
            {jewelry?.diamond?.cut.cutDescription}, size:{" "}
            {`${jewelry?.size.sizeNumber} ${jewelry?.size.unit} (${jewelry?.size.type})`}
          </p>

          <div className="mt-4">
            <button
              className="bg-black text-white px-20 py-3 rounded-full hover:bg-gray-800"
              onClick={() => handleSave(jewelry)}
            >
              Save
            </button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
