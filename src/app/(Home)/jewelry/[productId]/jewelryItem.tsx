'use client'
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Assuming react-router-dom for navigation
import NavbarPage from "../../navbar/page";
import JewelryItemData from "./jewelryItemData";
import { JewelryDetail, viewJewelryDetails } from "@/dbutils/jewelryAPI/viewJewelryDetail";
import { addToCart } from "@/dbutils/jewelryAPI/addToCart"; // Adjusted import path

const JewelryItem: React.FC = () => {
  const router = useRouter();
  const { productId } = useParams<{ productId?: string }>(); // productId may be undefined
  const [itemDetails, setItemDetails] = useState<JewelryDetail | null>(null);
  const [buttonText, setButtonText] = useState('ADD TO BAG');

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add items to your cart.');
      router.push('/login');
      return;
    }

    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }

    try {
      await addToCart(productId, token);
      setButtonText('ADDED');
      setTimeout(() => setButtonText('ADD TO BAG'), 700);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;

      try {
        const details = await viewJewelryDetails(productId);
        setItemDetails(details);
      } catch (error) {
        console.error('Error fetching jewelry details:', error);
      }
    };

    fetchData();
  }, [productId]);

  if (!itemDetails) return <div>Loading...</div>;

  return (
    <div className="flex flex-col bg-white">
      <div className="self-center mt-20 w-full max-w-[1214px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={itemDetails.img}
              alt={itemDetails.name}
              className="mt-20 w-80 h-80 object-cover mx-auto"
            />
          </div>
          <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 mt-10 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col">
                  <div className="text-base hover:text-custom-brown text-neutral-600">
                    <button onClick={() => router.back}>BACK TO SELECTION</button>
                  </div>
                  <div className="mt-11 text-4xl text-black max-md:mt-10">
                    {itemDetails.name}
                  </div>
                  <div className="mt-4 text-2xl font-bold text-black text-opacity-50">
                    ${itemDetails.price}
                  </div>
                </div>
                <img
                  loading="lazy"
                  alt=""
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/993591a3a81dab2d2c2ebb7f3b4a931dab5d810de16c88f48d4f1c172185adfc?"
                  className="shrink-0 my-auto aspect-[0.94] w-[35px]"
                />
              </div>
              <div className="mt-9 text-xl text-black font-[350] max-md:max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                <br />
              </div>
              <button
                className="justify-center w-36 self-start px-4 py-4 mt-9 text-lg border border-solid bg-opacity-0 border-neutral-700 text-neutral-700 hover:bg-custom-brown hover:text-white"
                onClick={handleClick}
              >
                {buttonText}
              </button>
              <JewelryItemData data={itemDetails} />
              <div className="flex gap-5 justify-center py-3 pr-2 pl-px mt-3 text-xl border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto my-auto">TIPS & WARNINGS</div>
                <img
                  loading="lazy"
                  alt=""
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a20b583fc524c1afdb28207b9bc2fbcaafc28e514c302e5d668864cf5c97e49?"
                  className="shrink-0 w-6 aspect-square"
                />
              </div>
              <div className="flex gap-5 justify-center py-3 pr-1.5 pl-px mt-3 text-xl border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto my-auto">LOCAL AVAILABILITY</div>
                <img
                  loading="lazy"
                  alt=""
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/35d01c5cc7d2f8e99764e480ad8a21ca61347d99af30fc8107408dfda4294276?"
                  className="shrink-0 aspect-square w-[26px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex z-10 flex-col text-center self-center px-5 pt-9 pb-4 mt-20 border-t border-solid border-neutral-300 max-md:mt-10 max-md:max-w-full">
        <div className="text-3xl text-black max-md:max-w-full">
          Recommended for you
        </div>
        <div className="mt-3 text-lg font-[353] text-neutral-500 max-md:max-w-full">
          Based on your history
        </div>
      </div>
    </div>
  );
};

export default JewelryItem;
