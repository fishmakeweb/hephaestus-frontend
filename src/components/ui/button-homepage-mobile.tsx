import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function MenuButton() {
  const router = useRouter();
  const handleHome = () => {
    router.push("/");
  };
  const handleJewelry = () => {
    router.push("/jewelry/page/1");
  }
  const handleDiamond = () => {
    router.push("/diamond");
  }
  const handleNewRelease = () => {
    router.push("/newrelease/page/1");
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">MENU</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="home" onClick={handleHome} className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">HOME</DropdownItem>
        <DropdownItem key="diamond" onClick={handleDiamond} className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">Diamond</DropdownItem>
        <DropdownItem key="jewelry" onClick={handleJewelry} className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">Jewelry</DropdownItem>
        <DropdownItem key="newrelease" onClick={handleNewRelease} className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">New release</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
