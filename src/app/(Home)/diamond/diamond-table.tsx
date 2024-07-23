"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export type Diamond = {
  diamonId: string;
  measurement: {
    measurementId: number;
    length: number;
    width: number;
    height: number;
  };
  carat: {
    caratId: number;
    carat: number; // Changed from 'value' to 'carat' to match your JSON
  };
  color: {
    colorId: number;
    colorDescription: string;
  };
  cut: {
    cutId: number;
    cutDescription: string;
  };
  clarity: {
    clarityId: number;
    clarityDescription: string;
  };
  gia: {
    giaId: number;
    issueDate: string;
    giaNumber: string;
  };
  price: number;
  img: string;
  sold: boolean;
};

export const columns: ColumnDef<Diamond>[] = [
  {
    accessorKey: "measurement",
    header: "Kích thước",
    cell: (info) =>
      `${info.row.original.measurement.length} x ${info.row.original.measurement.width} x ${info.row.original.measurement.height}`,
  },
  {
    accessorKey: "carat.carat",
    header: "Carat",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "color.colorDescription",
    header: "Color",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "cut.cutDescription",
    header: "Cut",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "clarity.clarityDescription",
    header: "Clarity",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "gia.giaNumber",
    header: "Mã GIA",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // className="text-cente"
        >
          Giá tiền
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: (info) => `$${info.getValue()}`,
  },
  {
    accessorKey: "img",
    header: "Hình ảnh",
    cell: ({ getValue }) => {
      const imageUrl = getValue() as string; // Type assertion to string
      return (
        <div className="w-full h-[10vh] flex items-center justify-center">
          <Image
            src={imageUrl}
            alt="Diamond"
            width={100}
            height={100}
            sizes="10vw"
            className="w-[40%] h-auto" // Use Tailwind classes for width and height instead of inline styles
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const diamond = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(diamond.gia.giaNumber)
              }
            >
              Sao chép mã GIA
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={"/contact"}>
            <DropdownMenuItem>
              Tư vấn ngay
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
