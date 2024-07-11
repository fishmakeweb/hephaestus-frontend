"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getAllJewelry } from "@/dbutils/jewelryAPI/getAllJewelry";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";

interface JewelryItem {
  jewelryId: string;
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
    const pageNumber = parseInt(page_number || "0") - 1;
    getAllJewelry(pageNumber)
      .then((data) => {
        setItems(
          data.content.map((item: JewelryItem) => ({
            jewelryId: item.jewelryId,
            img: item.img,
            name: item.name,
            price: item.price,
          }))
        );
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
      })
      .catch((error) => console.error("Error fetching jewelry data:", error));
  }, [page_number]);

  return (
    <div className="bg-white">
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5">
        {items.map((item) => (
          <div
            key={item.jewelryId}
            className="w-full max-w-xs bg-white rounded-xl hover:shadow-md duration-500"
          >
            <Link href={`/jewelry/${item.jewelryId}`}>
              <div className="w-full h-[50vh] ">
              <Image
                width={150}
                height={100}
                src={item.img}
                alt={item.name}
                sizes="10vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              </div>
              
              <div className="px-4 py-3">
                <p className="text-darkgray text-sm font-normal truncate capitalize">
                  {item.name}
                </p>
                <p className="text-lightgray text-sm font-normal my-3">
                  ${item.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <Pagination>
        <PaginationContent>
          {currentPage > 0 && (
            <PaginationItem>
              <PaginationPrevious href={"/jewelry/page/" + currentPage} />
            </PaginationItem>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={"/jewelry/page/" + (i + 1)}
                isActive={i === currentPage}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationNext href={"/jewelry/page/" + (currentPage + 2)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
