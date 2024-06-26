'use client'
import React, {useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import Link from "next/link";
import { getAllJewelry } from "@/dbutils/jewelryAPI/getAllJewelry"; 
import NavbarPage from "../../../navbar/page";



export default function Jewelry() {
    const { page_number } = useParams<{ page_number: string }>(); 
    const [items, setItems] = useState<{ productId: string; img: string; name: string; price: number }[]>([]);
  
    useEffect(() => {
      getAllJewelry(page_number)
        .then(data => setItems(data))
        .catch(error => console.error("Error fetching jewelry data:", error));
    }, [page_number]);

  return (
    <div className="bg-white">

      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {items.map((item) => (
          <div key={item.productId} className="w-72 bg-white rounded-xl hover:shadow-md duration-500">
            <Link href={`/jewelry/${item.productId}`}>
              <img
                src={`${item.img}`}
                alt={item.name}
                className="w-64 h-64 mt-2 mb-2 object-cover mx-auto"
              />
              <div className="px-4 py-3">
                <p className="text-darkgray text-sm font-normal truncate capitalize">{item.name}</p>
                <div className="flex items-center">
                  <p className="text-lightgray text-sm font-normal my-3">${item.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
