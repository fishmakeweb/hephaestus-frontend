import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
export default function MenuButton() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="border-4">MENU</Button>
      </DropdownTrigger>
      <DropdownMenu className="bg-white">
        <Link href={"/"}>
        <DropdownItem key="home" className="hover:bg-gray-300  active:bg-gray-300 focus:outline-none focus:ring-gray-300">HOME</DropdownItem>
        </Link>
        <Link href={'/diamond'}>
        <DropdownItem key="diamond" className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300">Diamond</DropdownItem></Link>
        <Link href={'/jewelry/page/1'}>
        <DropdownItem key="jewelry" className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300">Jewelry</DropdownItem></Link>
        <Link href={'/new-release/page/1'}>
        <DropdownItem key="newrelease" className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300">New release</DropdownItem></Link>
      </DropdownMenu>
    </Dropdown>
  );
}
