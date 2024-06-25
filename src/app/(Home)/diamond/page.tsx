import React from "react";
import { Diamond, columns } from './diamondtable'
import { DataTable } from "@/components/data-table";
import getDiamonds from "@/dbutils/diamondAPI/getAllDiamond";
export default async function DiamondPage() {
    const data = await getDiamonds();
    return(
        <section className="py-24">
            <div className="container">
                <h1 className="text-3xl font-bold"> All Diamond</h1>
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </section>
    )
}