import React from "react";
import { Diamond, columns } from './diamond-table'
import { DataTable } from "@/components/data-table";
import getDiamonds from "@/dbutils/diamondAPI/getAllDiamond";
import NavbarPage from "../navbar/page";
export default async function DiamondPage() {
    const data = await getDiamonds();

    return(
        <>
        <NavbarPage />
        <section className="py-24">
            <div className="container">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </section>
        </>
    )
}