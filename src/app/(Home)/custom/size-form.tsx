"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  onBack: () => void;
  onSelectSize: (size: Size) => void;
}
export default function SizeForm({jewelry,onBack,onSelectSize,
}: SizeFormProps) {
  const [widthRing, setWidthRing] = useState(150);
  const [heightRing, setHeightRing] = useState(140); // Default height set to 140
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedSizeText, setSelectedSizeText] =
    useState<string>("SELECT SIZE");
  const getAllAttribute = new getAttribute();
  const [srcSize, setSrcSize] = useState("/img/jewelry/ringSize.jpg");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAttribute.getSizes();
      setSizes(response);
    };
    fetchData();

    if (jewelry?.category.categoryId === 2) {
      setSrcSize("/img/jewelry/necklacesize.webp");
    } else {
      setSrcSize("/img/jewelry/ringSize.jpg");
    }
  }, [jewelry]);

  useEffect(() => {
    // Change srcSize based on jewelry category
    if (jewelry?.category.categoryId === 2) {
      setSrcSize("/img/jewelry/necklacesize.webp");
    } else {
      setSrcSize("/img/jewelry/ringSize.jpg");
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
  const handleSubmit = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    onSelectSize(selectedSize);
  };
  return (
    <>
      <button
        className="bg-white hover:bg-gray-300 transition duration-300 text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        onClick={onBack}
      >
        ←
      </button>
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
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
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
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg
              className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
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
      <Card>
        <CardBody className="items-center">
          <p className="max-w-md text-center">
            We usually recommend a 15mm ring face for a typical man&apos;s ring.
            If you&apos;re planning for this to be a pinky ring or for a woman,
            a 13mm ring face is a great fit. Bigger options (17mm+) make a
            statement and look good on large fingers.
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
          {jewelry?.category.categoryId === 1 ||
          jewelry?.category.categoryId === 3 ? (
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
      <ScrollArea className="max-h-[550px] lg:max-h-[620px] overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-4">
          <Card className="w-full max-w-md mx-auto my-4 lg:my-8 bg-white rounded-lg shadow-md">
            <CardBody className="flex flex-col gap-2">
              <p className="text-md font-semibold">
                Category: "{jewelry?.category.categoryName}"
              </p>
              <p className="text-md font-semibold">
                Material: "{jewelry?.material.materialName}"
              </p>
              <p className="text-md font-semibold">
                Shape: "{jewelry?.shape.shapeDescription}"
              </p>
              <p className="text-md font-semibold">
                Gemstone: {jewelry?.diamond?.cut.cutDescription}
              </p>
              <p className="text-md font-semibold">Size:</p>
            </CardBody>
          </Card>
        </div>
      </ScrollArea>
    </>
  );
}
