import React, { useEffect } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
import { ScrollArea } from "@/components/ui/scroll-area";
interface GemstoneFormProps {
  jewelry: Jewelry | null;
  setJewelry: React.Dispatch<React.SetStateAction<Jewelry | null>>;
  onBack: () => void;
  onSelectGemstone: (option: any) => void;
}

const gemstoneOptions = [
  {
    title: "Trơn",
    img: "/img/jewelry/WB-3.jpg",
    path: "/size",
  },
  {
    title: "Đính đá",
    img: "/img/jewelry/FR-3.jpg",
    path: "/center-stone-detail",
  },
];

export default function GemstoneForm({ jewelry, setJewelry, onBack, onSelectGemstone }: GemstoneFormProps) {
  const router = useRouter();

  useEffect(() => {
    const storedJewelry = localStorage.getItem("edittingJewelry");
    if (storedJewelry) {
      setJewelry(JSON.parse(storedJewelry));
    }
  }, [setJewelry]);

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
      <div className="gap-2 mt-5 grid grid-cols-2 sm:grid-cols-2">
        {gemstoneOptions.map((item, index) => (
          <Card
            shadow="sm"
            className="py-24"
            key={index}
            isPressable
            onClick={() => onSelectGemstone(item)}
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
      <ScrollArea className="max-h-[550px] lg:max-h-[620px] overflow-y-auto">
        <div className="flex flex-wrap justify-center gap-4">
          <Card className="w-full max-w-md mx-auto my-4 lg:my-8 bg-white rounded-lg shadow-md">
            <CardBody className="flex flex-col gap-2">
              <p className="text-md font-semibold">Category: "{jewelry?.category.categoryName}"</p>
              <p className="text-md font-semibold">Material: "{jewelry?.material.materialName}"</p>
              <p className="text-md font-semibold">Shape: "{jewelry?.shape.shapeDescription}"</p>
              <p className="text-md font-semibold">Gemstone:</p>
              <p className="text-md font-semibold">
                Size:
              </p>
            </CardBody>
          </Card>
        </div>
      </ScrollArea>
    </>
  );
}
