'use client'
import React, {useEffect} from "react";
import { Diamond, columns } from "./diamond-table";
import { DataTable } from "@/components/data-table";
import getDiamonds from "@/dbutils/diamondAPI/getAllDiamond";
export default function DiamondPage() {
  const [filteredData, setFilteredData] = React.useState<Diamond[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDiamonds();
        setFilteredData(data.filter((diamond) => !diamond.sold));
      } catch (error) {
        console.error("Error fetching jewelry details:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <section className="py-24">
        <div className="container">
          <DataTable columns={columns} data={filteredData} />
        </div>
      </section>
    </>
  );
}
