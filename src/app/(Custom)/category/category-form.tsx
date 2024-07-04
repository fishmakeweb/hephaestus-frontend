import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import getAttribute, { Category, Jewelry } from "@/dbutils/customAPI/getAttribute";
import MaterialForm from "../material/material-form";
import { useRouter } from "next/navigation";
// Mapping of category names to image URLs
const categoryImageMap: { [key: string]: string } = {
  "Engagement Ring": "/img/homepage/eng-ring-sample.png",
  "Fashion Ring" : "/img/jewelry/CT-4.jpg",
  "Necklace": "/img/jewelry/PD-1.jpg",
  // Add more mappings as needed
  // Ensure the keys match the category names or IDs
};

export default function CategoryForm() {
  const atrFetch = new getAttribute();
  const [jewelry, setJewelry] = useState<Jewelry | null>(null);
  const [category, setCategory] = useState<Category[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const response = await atrFetch.getCategory();
      setCategory(response);
    };

    fetchData();
  }, []);

  const handleCategorySelect = (cat: Category) => {
    const updatedJewelry = {
      ...jewelry,  // Ensure existing properties are maintained, if any
      category: cat,
    };
  
    sessionStorage.setItem("edittingJewelry", JSON.stringify(updatedJewelry));
    router.push("/material");  // Navigate to MaterialForm page
  };

  return (
    <>
    <h1 className="text-center text-4xl font-bold tracking-tight lg:text-3xl">
      Choose a type of jewelry
    </h1>
    <div className="gap-20 my-5 grid grid-cols-2 sm:grid-cols-3">
      {category.map((cat) => (
        <Card shadow="sm" className="py-20" key={cat.categoryId} isPressable onClick={() => handleCategorySelect(cat)}>
          <CardBody className="p-0 overflow-visible items-center">
            <Image
              width={150}
              height={100}
              alt={cat.categoryName}
              className="object-cover h-[140px]"
              src={categoryImageMap[cat.categoryName]}
            />
          </CardBody>
          <CardFooter className="justify-center gap-4 text-small">
            <b>{cat.categoryName}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  </>
  );
}
