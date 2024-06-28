"use client"
import React from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { UserIcon } from "./user-icon";
import { ChevronDownIcon } from "./user-dropdwon-icon";
import AuthService from "@/dbutils/userAPI/authservice";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    AuthService.logout(); // Assume AuthService has a logout method
    router.push("/"); // Redirect to login page after logout
  };

  // Function to navigate to the profile page
  const handleViewProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="flex gap-4 items-center ">
      <ButtonGroup variant="flat">
        <Dropdown placement="bottom-end" >          
          <DropdownTrigger>
            <Button isIconOnly>
              <UserIcon />
              <ChevronDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="User options"
            className="max-w-[300px]"
          >
            <DropdownItem
              key="profile"
              onClick={handleViewProfile}
              className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
            >
              View Profile
            </DropdownItem>
            <DropdownItem key="logout" onClick={handleLogout} className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    </div>
  );
}
