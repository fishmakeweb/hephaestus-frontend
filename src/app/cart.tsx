"use client";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import {
  fetchCart,
  updateQuantity,
  ItemDetails,
} from "@/dbutils/cartAPI/cartFunction";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Cart() {
  const [itemDetails, setItemDetails] = useState<ItemDetails[]>([]);
  const [errorMessages, setErrorMessages] = useState<{ [key: number]: string }>(
    {}
  );
  const [orderId, setOrderId] = useState<number>();
  const router = useRouter();

  const fetchCartData = async () => {
    try {
      const data = await fetchCart();
      if (data.listOrderDetail.length !== 0)
        setOrderId(data.listOrderDetail[0].id);
      setItemDetails(
        data.listOrderDetail.map((item) => ({
          ...item.product.jewelry,
          orderDetailId: item.id,
          quantity: item.quantity,
        }))
      );
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const updateQuantityInState = (
    orderDetailId: number,
    newQuantity: number
  ) => {
    setItemDetails((currentItems) =>
      currentItems
        .map((item) =>
          item.orderDetailId === orderDetailId
            ? { ...item, quantity: newQuantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const debouncedUpdateTotal = useCallback(
    debounce((orderDetailId: number, newQuantity: number) => {
      updateQuantity(orderDetailId, newQuantity);
    }, 300),
    []
  );

  const handleQuantityChange = (orderDetailId: number, newQuantity: string) => {
    const numericQuantity = parseInt(newQuantity, 10);
    if (!isNaN(numericQuantity)) {
      if (numericQuantity > 1000) {
        setErrorMessages((prev) => ({
          ...prev,
          [orderDetailId]: "Quantity cannot exceed 1000",
        }));
      } else {
        setErrorMessages((prev) => ({ ...prev, [orderDetailId]: "" }));
        updateQuantityInState(orderDetailId, numericQuantity);
        debouncedUpdateTotal(orderDetailId, numericQuantity);
      }
    }
  };

  const incrementQuantity = (
    orderDetailId: number,
    currentQuantity: number
  ) => {
    handleQuantityChange(orderDetailId, (currentQuantity + 1).toString());
  };

  const decrementQuantity = (
    orderDetailId: number,
    currentQuantity: number
  ) => {
    handleQuantityChange(
      orderDetailId,
      Math.max(currentQuantity - 1, 0).toString()
    );
  };

  const removeFromCart = (orderDetailId: number) => {
    updateQuantityInState(orderDetailId, 0);
    updateQuantity(orderDetailId, 0);
  };

  const getTotalAmount = () => {
    return itemDetails.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-3xl "
          onClick={fetchCartData}
        >
          <svg className="flex-1 w-8 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42C7.28,15 7.17,14.89 7.17,14.75L7.2,14.65L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.59C21,5.39 21.06,5.2 21.06,5A1,1 0 0,0 20.06,4H5.21L4.27,2H1Z" />
            <g fill="none">
              <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
            </g>
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>
            <Image
              className="inline-block pb-3 w-auto h-auto"
              loading="lazy"
              src="https://ap-south-1.linodeobjects.com/diamondshop-img/incartlogo.svg"
              width={30}
              height={30}
              alt="In cart Logo"
            />
            <p className="inline-block text-2xl font-semibold ml-16">
              Your cart
            </p>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center">
          {itemDetails.length === 0 ? (
            <p className="text-xl text-center font-medium text-neutral-600">
              Your cart is currently empty.
            </p>
          ) : (
            <ScrollArea className="w-full h-[70vh]">
              <ul className="divide-y divide-gray-200 w-full">
                {itemDetails.map((item) => (
                  <li
                    key={item.orderDetailId}
                    className="py-4 flex items-center flex-wrap md:flex-nowrap"
                  >
                    <Image
                      loading="lazy"
                      src={item.img}
                      alt={item.name}
                      width={500}
                      height={300}
                      sizes="100vw"
                      style={{
                        width: "20%",
                        height: "auto",
                      }}
                    />
                    <div className="ml-4 flex-grow">
                      <p className="text-lg font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2 md:mt-0">
                        <button
                          className="text-sm text-gray-600 px-3 py-1 bg-gray-200 rounded-md"
                          onClick={() =>
                            decrementQuantity(item.orderDetailId, item.quantity)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          max="1000"
                          className="w-12 text-center border border-gray-300 rounded-md mx-2"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.orderDetailId,
                              e.target.value
                            )
                          }
                        />
                        <button
                          className="text-sm text-gray-600 px-3 py-1 bg-gray-200 rounded-md"
                          onClick={() =>
                            incrementQuantity(item.orderDetailId, item.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                      {errorMessages[item.orderDetailId] && (
                        <p className="text-red-500 text-sm mt-2">
                          {errorMessages[item.orderDetailId]}
                        </p>
                      )}
                    </div>
                    <button
                      className="text-sm text-red-600 mt-4 md:mt-0 md:ml-6"
                      onClick={() => removeFromCart(item.orderDetailId)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}

          <SheetFooter>
            {itemDetails.length > 0 && (
              <div className="mt-4 w-full flex flex-col items-center">
                <p className="text-md font-semibold text-center">
                  Total Amount: ${getTotalAmount().toFixed(2)}
                </p>
                <SheetClose asChild className="mt-4">
                  <Link
                    className="bg-black text-white px-20 py-3 rounded-full hover:bg-gray-800"
                    href="/order-confirmation"
                  >
                    CHECK OUT
                  </Link>
                </SheetClose>
              </div>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
