"use client";
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
import Link from "next/link";

export default function UserProfile() {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    AuthService.logout(); // Assume AuthService has a logout method
    router.refresh();
  };

  return (
    <div className="flex mr-4 mt-1">
      <div className="inline relative">
        <div className="inline-flex relative px-2 border rounded-full hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300">
          <div className="flex gap-4 items-center ">
            <ButtonGroup variant="flat">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button isIconOnly>
                    <UserIcon />
                    <ChevronDownIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="User options"
                  className="max-w-[300px] bg-white"
                >
                  <DropdownItem key="profile">
                    <Link
                      href={"/profile"}
                      className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300"
                    >
                      View Profile
                    </Link>
                  </DropdownItem>

                  <DropdownItem key="profile">
                    <Link
                      href={"/view-custom-order"}
                      className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300"
                    >
                      View custom order
                    </Link>
                  </DropdownItem>

                  <DropdownItem key="profile">
                    <Link
                      href={"/tracked-orders"}
                      className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300"
                    >
                      Purchased Orders
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="logout"
                    onClick={handleLogout}
                    className="hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300"
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
