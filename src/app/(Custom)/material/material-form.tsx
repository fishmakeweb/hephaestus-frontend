import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import getAttribute, { Material, Jewelry } from "@/dbutils/customAPI/getAttribute";
import { useRouter } from "next/navigation";
interface MaterialFormProps {
  jewelry: Jewelry | null;
  setJewelry: React.Dispatch<React.SetStateAction<Jewelry | null>>;
}

export default function MaterialForm({ jewelry, setJewelry }: MaterialFormProps) {
  const atrFetch = new getAttribute();
  const [material, setMaterial] = useState<Material[]>([]);
  const router = useRouter();
  const handleBack = ()  =>  {
    router.back();
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await atrFetch.getMaterial();
      setMaterial(response);
    };

    fetchData();
    const storedJewelry = sessionStorage.getItem("edittingJewelry");
    if (storedJewelry) {
      setJewelry(JSON.parse(storedJewelry));
    }
  }, []);

  const handleMaterialSelect = (mat: Material) => {
    const updatedJewelry = {
      ...jewelry,  // Ensure existing properties are maintained, if any
      material: mat,
    };

    sessionStorage.setItem("edittingJewelry", JSON.stringify(updatedJewelry));
    router.push("/shape");  // Navigate to MaterialForm page
  };

  const materialImageMap: { [key: string]: string } = {
    "Gold": "/img/jewelry/FR-2.jpg",
    "Silver": "/img/jewelry/BR-6.jpg",
    "Platinum": "/img/jewelry/ER-3.jpg",
    "White Gold": "/img/jewelry/PDR-1.jpg",
    "Rose Gold": "/img/jewelry/RS-14.jpg",
    "Titan": "/img/jewelry/WB-2.jpg",
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
            {material.map((mat) => (
              <Card shadow="sm" key={mat.materialId} isPressable onClick={() => handleMaterialSelect(mat)}>
                <CardBody className="overflow-visible p-0 items-center">
                  <Image
                    width={150}
                    height={100}
                    alt={mat.materialName}
                    className="object-cover h-[140px]"
                    src={materialImageMap[mat.materialName] || "/img/homepage/default-image.png"} // Use default image if no match found
                  />
                </CardBody>
                <CardFooter className="text-small justify-center gap-4">
                  <b>{mat.materialName}</b>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
    </>
  );
}
