'use client'
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Link from "next/link";
import { getAllJewelry } from "@/dbutils/jewelryAPI/getAllJewelry";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface JewelryItem {
  productId: string;
  img: string;
  name: string;
  price: number;
}

export default function Jewelry() {
  const { page_number } = useParams<{ page_number: string }>();

  const [items, setItems] = useState<JewelryItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    const pageNumber = parseInt(page_number || '0');
    getAllJewelry(pageNumber)
      .then(data => {
        setItems(data.content.map((item: JewelryItem) => ({
          productId: item.productId,
          img: item.img,
          name: item.name,
          price: item.price
        })));
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
      })
      .catch(error => console.error("Error fetching jewelry data:", error));
  }, [page_number]);

  

  return (
    <div className="bg-white">
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {items.map((item) => (
          <div key={item.productId} className="w-72 bg-white rounded-xl hover:shadow-md duration-500">
            <Link href={`/jewelry/${item.productId}`}>
              <img src={item.img} alt={item.name} className="w-64 h-64 mt-2 mb-2 object-cover mx-auto" />
              <div className="px-4 py-3">
                <p className="text-darkgray text-sm font-normal truncate capitalize">{item.name}</p>
                <p className="text-lightgray text-sm font-normal my-3">${item.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <Pagination>
        <PaginationContent>
          {currentPage > 0 && (
            <PaginationItem>
              <PaginationPrevious href={"/jewelry/page/"+ (currentPage - 1)} />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href={"/jewelry/page/"+ i} isActive={i === currentPage}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationNext href={"/jewelry/page/"+ (currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

    </div>
  );
}
