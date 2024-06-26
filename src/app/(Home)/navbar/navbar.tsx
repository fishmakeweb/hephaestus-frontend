'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Cart } from "./cart";
import AuthService from "@/dbutils/userAPI/authservice";

const NewNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearchSubmit = () => {
    console.log("Search Term:", searchTerm);
  };



  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <>
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
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
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
                  <Link
                  href="/"
                  
                  >
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
            <div className="hidden md:flex custom-hide">
              <Link
                href="/diamond"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <p className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Diamond
                </p>
              </Link>
              <Link
                href="/jewelry/page/1"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <p className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Jewelry
                </p>
              </Link>
              <Link
                href="/newrelease/page/1"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
                
              >
                <p className="flex items-center relative cursor-pointer whitespace-nowrap">
                  New release
                </p>
              </Link>
            </div>
        </div>
        {/* end logo */}
        {/* search bar */}
        <div className="block flex-shrink flex-grow-0 justify-start px-2">
          <div className="inline-block">
            <div className="inline-flex items-center max-w-full">
              <Link
                href="/"
                className="flex items-center pb-4 border-b border-b-gray-400 md:block"
              >
                <h2 className="font-bold text-xl	">H E P H E A T H U S</h2>
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
                  <div
                      className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
                  >
                    <div className="block flex-grow-0 flex-shrink-0 h-8 w-6">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="h-full w-full fill-current"
                      >
                        <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex mr-4 mt-1">
                <div className="inline relative">
                  <div
                    
                    className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
                  >
                    <Link
                    href="/login"
                     className="block flex-grow-0 flex-shrink-0 h-8 w-6">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="h-full w-full fill-current"
                      >
                        <path
                          d="m16 2c3.866 0 7 3.134 7 7v5h1c1.1046 0 2 .89543 2 2v13c0 1.1046-.8954 2-2 2h-16c-1.10457 0-2-.8954-2-2v-13c0-1.10457.89543-2 2-2h1v-5c0-3.866 3.13401-7 7-7zm0 18c-2.2091 0-4 1.7909-4 4h8c0-2.2091-1.7909-4-4-4zm0-13c-2.2091 0-4 1.7909-4 4v5h8v-5c0-2.2091-1.7909-4-4-4z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* end login */}
      </nav>




    </>
  );
};

export default NewNavbar;
