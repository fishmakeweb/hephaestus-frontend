import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Jewelry } from "@/dbutils/customAPI/getAttribute";
import getDiamonds from "@/dbutils/diamondAPI/getAllDiamond"; // Adjust the import path
import { Diamond } from "@/app/(Home)/diamond/diamond-table";

interface CenterStoneFormProps {
  jewelry: Jewelry | null;
  setJewelry: React.Dispatch<React.SetStateAction<Jewelry | null>>;
}

export default function CenterStoneForm({
  jewelry,
  setJewelry,
}: CenterStoneFormProps) {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedJewelry = sessionStorage.getItem("edittingJewelry");
    if (storedJewelry) {
      setJewelry(JSON.parse(storedJewelry));
    }
    async function loadDiamonds() {
      try {
        setLoading(true);
        const fetchedDiamonds = await getDiamonds();
        setDiamonds(fetchedDiamonds);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching diamonds:", error);
        setLoading(false);
      }
    }
    loadDiamonds();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleSelectDiamond = (selectedDiamond: Diamond) => {
    if (jewelry) {
      const updatedJewelry = { ...jewelry, diamond: selectedDiamond };
      setJewelry(updatedJewelry);
      sessionStorage.setItem("edittingJewelry", JSON.stringify(updatedJewelry));
      router.push("/size");
    }
  };

  return (
    <>
      <button onClick={handleBack}>Back</button>
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-3xl">
        Select a Center Stone
      </h1>
      <div className="relative overflow-x-auto">
        {loading ? (
          <p>Loading diamonds...</p>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Measurement(lxhxw)
                </th>
                <th scope="col" className="px-6 py-3">
                  Carat
                </th>
                <th scope="col" className="px-6 py-3">
                  Cut
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Clarity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {diamonds.map((diamond, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {diamond.measurement.length}x{diamond.measurement.height}x
                    {diamond.measurement.width}
                  </th>
                  <td className="px-6 py-4">{diamond.carat.carat}</td>
                  <td className="px-6 py-4">{diamond.cut.cutDescription}</td>
                  <td className="px-6 py-4">{diamond.color.colorDescription}</td>
                  <td className="px-6 py-4">{diamond.clarity.clarityDescription}</td>
                  <td className="px-6 py-4">${diamond.price}</td>
                  <td>
                    <button
                      className="inline-block bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      onClick={() => handleSelectDiamond(diamond)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
