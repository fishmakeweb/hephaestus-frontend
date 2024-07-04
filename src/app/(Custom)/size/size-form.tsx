"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@nextui-org/react";
import { Jewelry, Size } from "@/dbutils/customAPI/getAttribute";
import getAttribute from "@/dbutils/customAPI/getAttribute";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";

interface SizeFormProps {
  jewelry: Jewelry | null;
  setJewelry: React.Dispatch<React.SetStateAction<Jewelry | null>>;
}

export default function SizeForm({ jewelry, setJewelry }: SizeFormProps) {
  const [widthRing, setWidthRing] = useState(150);
  const [heightRing, setHeightRing] = useState(140); // Default height set to 140
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [selectedSizeText, setSelectedSizeText] =
    useState<string>("SELECT SIZE");
  const router = useRouter();
  const getAllAttribute = new getAttribute();
  const [srcSize, setsrcSize] = useState("/img/jewelry/ringSize.jpg");
  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    const updatedJewelry = {
      ...jewelry, // Ensure existing properties are maintained, if any
      size: selectedSize,
    };
    sessionStorage.setItem("edittingJewelry", JSON.stringify(updatedJewelry));
    router.push("/note"); // Navigate to MaterialForm page
  };



  useEffect(() => {
    const storedJewelry = sessionStorage.getItem("edittingJewelry");
    if (storedJewelry) {
      setJewelry(JSON.parse(storedJewelry));
    }
    const fetchData = async () => {
      const response = await getAllAttribute.getSizes();
      setSizes(response);
    };
    fetchData();

    if (jewelry?.category.categoryId === 2) {
      setsrcSize("/img/jewelry/necklacesize.webp");
    } else {
      setsrcSize("/img/jewelry/ringSize.jpg");
    }
  }, []);

  useEffect(() => {
    // Change srcSize based on jewelry category
    if (jewelry?.category.categoryId === 2) {
      setsrcSize("/img/jewelry/necklacesize.webp");
    } else {
      setsrcSize("/img/jewelry/ringSize.jpg");
    }
  }, [jewelry]); 

  const handleSizeSelect = (size: Size, sizeText: string) => {
    setSelectedSize(size);
    setSelectedSizeText(sizeText);

    // Set specific heights for different sizes
    if (size.type === "Ring") {
      switch (size.sizeNumber) {
        case 6:
          setHeightRing(160);
          setWidthRing(160);
          break;
        case 7:
          setHeightRing(180);
          setWidthRing(180);
          break;
        case 8:
          setHeightRing(200);
          setWidthRing(200);
          break;
        default:
          setHeightRing(140);
          setWidthRing(150);
          break;
      }
    } else if (size.type === "Necklace") {
      switch (size.sizeNumber) {
        case 16:
          setHeightRing(160);
          setWidthRing(160);
          break;
        case 18:
          setHeightRing(180);
          setWidthRing(180);
          break;
        case 20:
          setHeightRing(200);
          setWidthRing(200);
          break;
        case 22:
          setHeightRing(220);
          setWidthRing(220);
          break;
        default:
          setHeightRing(140);
          setWidthRing(150);
          break;
      }
    }
  };

  return (
    <>
      <button onClick={handleBack}>Back</button>
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-3xl">
        Size
      </h1>
      <p className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-xl">
        Current Jewelry: category: {jewelry?.category.categoryName}, material:{" "}
        {jewelry?.material.materialName}, diamond:{" "}
        {jewelry?.diamond?.cut.cutDescription}
      </p>
      <Card>
        <CardBody className="items-center">
          <p className="max-w-md text-center">
            We usually recommend a 15mm ring face for a typical man&apos;s ring. If
            you&apos;re planning for this to be a pinky ring or for a woman, a 13mm
            ring face is a great fit. Bigger options (17mm+) make a statement
            and look good on large fingers.
          </p>
          <div className="ring-size-img-wrapper flex justify-center space-x-4">
            <div className="relative">
              <Image
                width={widthRing}
                height={heightRing}
                alt="Ring size"
                className="object-cover"
                src={srcSize}
              />
            </div>
          </div>
          {jewelry?.category.categoryId === 1 ? (
            <div className="w-full flex justify-center mt-4">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button className="border-solid border-2 border-black">
                    {selectedSizeText}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Ring Size options"
                  className="max-w-[300px] bg-white"
                >
                  {sizes
                    .filter((size) => size.type === "Ring")
                    .map((size) => (
                      <DropdownItem
                        key={size.sizeId}
                        onClick={() =>
                          handleSizeSelect(
                            size,
                            `${size.sizeNumber} ${size.unit} (${size.type})`
                          )
                        }
                        className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300"
                      >
                        {`${size.sizeNumber} ${size.unit} (${size.type})`}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : jewelry?.category.categoryId === 2 ? (
            <div className="w-full flex justify-center mt-4">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button>{selectedSizeText}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Necklace Size options"
                  className="max-w-[300px] bg-white"
                >
                  {sizes
                    .filter((size) => size.type === "Necklace")
                    .map((size) => (
                      <DropdownItem
                        key={size.sizeId}
                        onClick={() =>
                          handleSizeSelect(
                            size,
                            `${size.sizeNumber} ${size.unit} (${size.type})`
                          )
                        }
                        className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300"
                      >
                        {`${size.sizeNumber} ${size.unit} (${size.type})`}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : null}
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-20 py-3 rounded-full hover:bg-gray-800"
            >
              NEXT
            </button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
