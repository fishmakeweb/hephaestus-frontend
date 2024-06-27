"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Cart } from "./cart";
import AuthService from "@/dbutils/userAPI/authservice";
import { ButtonAsChild } from "@/components/ui/login-button";
import UserProfile from "@/components/ui/user-profile-button";
import { useRouter } from "next/navigation";
const NewNavbar = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true); // This will be true only on the client side after mounting
  }, []);

  return (
    <>
      {isClient && (
        <nav className="bg-white w-full flex relative justify-between items-center mx-auto px-7 h-20 z-50">
          {/* Dropdown for small screens */}
          <div className="block md:hidden">
            <div className="relative inline-block text-left">
              <span className="rounded-md shadow-sm">
                <button
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                  aria-controls="headlessui-menu-items-117"
                >
                  <span className="font-bold">MENU</span>
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      values="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
              <div
                className="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
                id="headlessui-menu-items-117"
              >
                <div
                  className="absolute left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                  aria-labelledby="headlessui-menu-button-1"
                  role="menu"
                >
                  <div className="px-4 py-3 font-semibold">
                    <Link href="/">
                      <p className="text-sm leading-5">HOME</p>
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/diamond"
                      tabIndex={0}
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left font-semibold"
                      role="menuitem"
                    >
                      Diamond
                    </Link>
                    <Link
                      href="/jewelry/page/1"
                      tabIndex={1}
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left font-semibold"
                      role="menuitem"
                    >
                      Jewelry
                    </Link>
                    <Link
                      href="/newrelease/page/1"
                      tabIndex={2}
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left font-semibold"
                      role="menuitem"
                    >
                      New Release
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end dropdown */}
          {/* logo */}
          <div className="inline-flex">
            <div className="md:flex custom-hide">
              <Link
                href="/diamond"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Diamond
                </div>
              </Link>
              <Link
                href="/jewelry/page/1"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Jewelry
                </div>
              </Link>
              <Link
                href="/newrelease/page/1"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  New release
                </div>
              </Link>
            </div>
          </div>
          {/* end logo */}
          {/* search bar */}
          <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
            <div className="inline-block">
              <div className="inline-flex items-center max-w-full">
                <Link
                  href="/"
                  className="flex items-center pb-4 border-b border-b-gray-400 md:block custom-hide"
                >
                  <h2 className="font-bold text-2xl">H E P H A E S T U S</h2>
                </Link>
              </div>
            </div>
          </div>
          {/* end search bar */}
          {/* login */}
          <div className="flex-initial">
            <div className="flex justify-end items-center relative">
              <div className="flex items-center">
                <div className="block relative">
                  <Cart />
                </div>
              </div>
              {AuthService.isAuthenticated() ? (
                <div className="flex mr-4 mt-1">
                  <div className="inline relative">
                    <div className="inline-flex relative px-2 border rounded-full hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">   
                        <UserProfile />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex mr-4 mt-1">
                  <div className="inline relative">
                        <ButtonAsChild />            
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* end login */}
        </nav>
      )}
    </>
  );
};

export default NewNavbar;
