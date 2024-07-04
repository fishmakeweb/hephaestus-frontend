import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import getAttribute, { Shape, Jewelry } from "@/dbutils/customAPI/getAttribute";
import { useRouter } from "next/navigation";
interface ShapeFormProps {
  jewelry: Jewelry | null;
  setJewelry: React.Dispatch<React.SetStateAction<Jewelry | null>>;
}

export default function ShapeForm({ jewelry, setJewelry }: ShapeFormProps) {
  const atrFetch = new getAttribute();
  const [shape, setShape] = useState<Shape[]>([]);
  const router = useRouter();
  const handleBack = ()  =>  {
    router.back();
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await atrFetch.getShape();
      setShape(response);
    };

    fetchData();
    const storedJewelry = sessionStorage.getItem("edittingJewelry");
    if (storedJewelry) {
      setJewelry(JSON.parse(storedJewelry));
    }
  }, []);

  const handleMaterialSelect = (shape: Shape) => {
    const updatedJewelry = {
      ...jewelry,  // Ensure existing properties are maintained, if any
      shape: shape,
    };

    sessionStorage.setItem("edittingJewelry", JSON.stringify(updatedJewelry));
    router.push("/gemstone");  // Navigate to MaterialForm page
  };

  const shapeImageMap: { [key: string]: string } = {
    "Circle": "/img/jewelry/WB-3.jpg",
    "Oval": "/img/jewelry/TDR-2.jpg",
    "Square": "/img/jewelry/SR-8.jpg",
    "Rectangle": "/img/jewelry/MDC-37.jpg",
    // Add more mappings as needed
    // Ensure the keys match the material names or IDs
  };

  return (
    <>
        <>
        <button onClick={handleBack}>
          Back
        </button>
          <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-3xl">
            Choose a type of material
          </h1>
          <p className="scroll-m-20 text-center text-xl font-bold tracking-tight lg:text-xl">
            Current Jewelry: 
            category: {jewelry?.category.categoryName}
          </p>
          <div className="gap-20 my-5 grid grid-cols-2 sm:grid-cols-3">
            {shape.map((shape) => (
              <Card shadow="sm" key={shape.shapeId} isPressable onClick={() => handleMaterialSelect(shape)}>
                <CardBody className="overflow-visible p-0 items-center">
                  <Image
                    width={150}
                    height={100}
                    alt={shape.shapeDescription}
                    className="object-cover h-[140px]"
                    src={shapeImageMap[shape.shapeDescription] || "/img/homepage/default-image.png"} // Use default image if no match found
                  />
                </CardBody>
                <CardFooter className="text-small justify-center gap-4">
                  <b>{shape.shapeDescription}</b>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
    </>
  );
}
