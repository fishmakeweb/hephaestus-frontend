import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";

interface GemstoneFormProps {
  jewelry: Jewelry | null;
  setJewelry: React.Dispatch<React.SetStateAction<Jewelry | null>>;
}

const gemstoneOptions = [
  {
    title: "No stone",
    img: "/img/jewelry/WB-3.jpg",
    path: "/size",
  },
  {
    title: "Center stone",
    img: "/img/jewelry/FR-3.jpg",
    path: "/center-stone-detail",
  },
];

export default function GemstoneForm({ jewelry, setJewelry }: GemstoneFormProps) {
  const router = useRouter();

  useEffect(() => {
    const storedJewelry = sessionStorage.getItem("edittingJewelry");
    if (storedJewelry) {
      setJewelry(JSON.parse(storedJewelry));
    }
  }, [setJewelry]);

  const handleGemstoneSelect = (option:any) => {
    const updatedJewelry = {
      ...jewelry,
      diamond: null,
    };
    sessionStorage.setItem("edittingJewelry", JSON.stringify(updatedJewelry));
    router.push(option.path);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <button onClick={handleBack}>Back</button>
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-3xl">
        Gemstone 
      </h1>
      <p className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-xl">
        Current Jewelry:
        category: {jewelry?.category.categoryName}, 
        material: {jewelry?.material.materialName}
      </p>
      <div className="gap-2 mt-5 grid grid-cols-2 sm:grid-cols-2">
        {gemstoneOptions.map((item, index) => (
          <Card
            shadow="sm"
            className="py-24"
            key={index}
            isPressable
            onClick={() => handleGemstoneSelect(item)}
          >
            <CardBody className="overflow-visible p-0 items-center">
              <Image
                width={150}
                height={100}
                alt={item.title}
                className="object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-center gap-4">
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
