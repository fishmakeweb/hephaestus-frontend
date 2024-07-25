"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Cart } from "./cart";
import AuthService from "@/dbutils/userAPI/authservice";
import { ButtonAsChild } from "@/components/ui/login-button";
import UserProfile from "@/components/ui/user-profile-button";
import { useRouter } from "next/navigation";
import MenuButton from "@/components/ui/button-homepage-mobile";
const NewNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
      const onAuthChange = () => setIsAuthenticated(AuthService.isAuthenticated());

      AuthService.subscribe(onAuthChange);

      return () => {
          AuthService.unsubscribe(onAuthChange);
      };
  }, []);
  // const [isClient, setIsClient] = useState(false);
  // const router = useRouter();
  // useEffect(() => {
  //   router.refresh();
  //   setIsClient(true); // This will be true only on the client side after mounting
  // }, []);

  return (
        <nav className="bg-white shadow-md shadow-black/5 w-full flex relative justify-between items-center mx-auto md:px-7 h-20 z-50">
          
          {/* end dropdown */}
          {/* logo */}
            <div className="block md:hidden">
                <MenuButton  />
            </div>
            <div className="hidden md:block">
              
              <Link
                href="/diamond"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Kim cương
                </div>
              </Link>
              <Link
                href="/jewelry/page/1"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Trang sức
                </div>
              </Link>
              <Link
                href="/newrelease/page/1"
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full font-semibold"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  Bộ sưu tập mới
                </div>
              </Link>
            </div>
          {/* end logo */}
          {/* search bar */}
                
                <Link
                  href="/"
                  className="flex items-center py-3 border-b border-b-gray-400 text-sm md:text-2xl md:mr-32 "
                >
                  <h2 className="font-bold ">TEST H E P H A E S T U S</h2>
                </Link>
                
          {/* end search bar */}
          {/* login */}
          <div className="flex-initial">
            <div className="flex justify-end items-center relative">
              <div className="flex items-center">
                <div className="block relative">
                  <Cart />
                </div>
              </div>
              {isAuthenticated ? (
                <div className="flex mr-4 mt-1">
                  <div className="inline relative">
                    <div className="inline-flex relative px-2 border rounded-full hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring-gray-300">   
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
  );
};

export default NewNavbar;
