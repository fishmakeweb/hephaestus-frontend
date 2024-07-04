import React from "react";
import { Diamond, columns } from './diamond-table'
import { DataTable } from "@/components/data-table";
import getDiamonds from "@/dbutils/diamondAPI/getAllDiamond";
export default async function DiamondPage() {
    const data = await getDiamonds();
    const filteredData = data.filter(diamond => !diamond.sold);

    return(
        <>
        <section className="py-24">
            <div className="container">
                <DataTable
                    columns={columns}
                    data={filteredData}
                />
            </div>
        </section>
        </>
    )
}