"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Assuming react-router-dom for navigation
import Image from "next/image";
import JewelryItemData from "./jewelryItemData";
import {
  JewelryDetail,
  viewJewelryDetails,
} from "@/dbutils/jewelryAPI/viewJewelryDetail";
import { addToCart } from "@/dbutils/jewelryAPI/addToCart"; // Adjusted import path
import TipsAndWarnings from "../tipsandwarning";
import Location from "@/app/location";
const JewelryItem: React.FC = () => {
  const router = useRouter();
  const { jewelryId } = useParams<{ jewelryId?: string }>(); // productId may be undefined
  const [showLocation, setShowLocation] = useState(false);
  const [mapUrl, setMapUrl] = useState("");
  const handleOpenLocation = (url: string) => {
    setMapUrl(url);
    setShowLocation(true);
  };
  const locations = [
    {
      name: "Quận 9",
      address: "Vinhome grand park, S10.06",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.540073034032!2d106.83739671086674!3d10.846466057852783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317521af4730391f%3A0xfa0bd6efed6cc3f9!2sS10.06%20Origami%2C%20Vinhomes%20Grandpark!5e0!3m2!1svi!2s!4v1721408031290!5m2!1svi!2s",
    },
    {
      name: "Bình Dương",
      address: "HT PEARL, A06.17",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.984863448347!2d106.7833512108672!3d10.888754557066415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d94cad4c6827%3A0xa995be83e3f54f52!2sChung%20c%C6%B0%20HT%20Pearl!5e0!3m2!1svi!2s!4v1721408746581!5m2!1svi!2s",
    },
    {
      name: "Khu công nghệ cao",
      address: "FPT University",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6524982885437!2d106.80923926960885!3d10.841128916501571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1718106331955!5m2!1svi!2s",
    },
  ];
  const handleCloseLocation = () => {
    setShowLocation(false);
  };
  const [itemDetails, setItemDetails] = useState<JewelryDetail | null>(null);
  const [buttonText, setButtonText] = useState("THÊM VÀO GIỎ HÀNG");
  const [showTips, setShowTips] = useState(false);
  const toggleTips = () => setShowTips(!showTips);
  const [openLocation, setOpenLocation] = useState(false);
  const toggleLocation = () => setOpenLocation(!openLocation);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginMessage(true); // Show login message
      setTimeout(() => {
        router.push("/login"); // Redirect to login after showing the message
      }, 3000); // Display message for 3 seconds before redirecting
      return;
    }

    if (!jewelryId) {
      console.error("Product ID is undefined");
      return;
    }

    try {
      await addToCart(parseInt(jewelryId));
      setButtonText("ĐÃ THÊM");
      setTimeout(() => setButtonText("THÊM VÀO GIỎ HÀNG"), 700);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!jewelryId) return;
      try {
        const details = await viewJewelryDetails(jewelryId);
        console.log(details);
        setItemDetails(details);
      } catch (error) {
        console.error("Error fetching jewelry details:", error);
      }
    };

    fetchData();
  }, [jewelryId]);

  if (!itemDetails) return <div>Loading...</div>;

  return (
    <div className="flex flex-col bg-white  mb-[20vh]">
      {showLoginMessage && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Vui lòng đăng nhập để tiếp tục.
        </div>
      )}
      <div className="self-center mt-20 w-full max-w-[1214px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
            <Image
              loading="lazy"
              src={itemDetails.img}
              alt={itemDetails.name}
              width={150}
              height={150}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 mt-10 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col">
                  <div className="text-base hover:text-custom-brown text-neutral-600">
                    <button
                      onClick={() => router.back()}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300 h-9 px-4 py-2"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                      >
                        <path
                          d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      QUAY LẠI LỰA CHỌN
                    </button>
                  </div>
                  <div className="mt-11 text-4xl text-black max-md:mt-10">
                    {itemDetails.name}
                  </div>
                  <div className="mt-4 text-2xl font-bold text-black text-opacity-50">
                    {itemDetails.price} VNĐ
                  </div>
                </div>
              </div>
              <div className="mt-9 text-xl text-black font-[350] max-md:max-w-full">
                Mỗi sản phẩm tại Hephaestus đều được chế tác tinh xảo, kết hợp
                giữa sự sang trọng và phong cách hiện đại. Được tạo ra từ những
                nguyên liệu quý Giá tiền nhất, sản phẩm này không chỉ là một món
                trang sức mà còn là biểu tượng của sự tinh tế và đẳng cấp.
                <br />
                Hãy để ánh sáng của những viên đá quý này tỏa sáng và làm nổi
                bật vẻ đẹp độc đáo của bạn.
              </div>
              <button
                className="justify-center w-45 self-start px-4 py-4 mt-9 text-lg border border-solid bg-opacity-0 border-neutral-700 text-neutral-700 hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                onClick={handleClick}
              >
                {buttonText}
              </button>

              <JewelryItemData data={itemDetails} />
              <div
                className="flex gap-5 justify-center py-3 pr-2 pl-px mt-3 text-xl border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full cursor-pointer"
                onClick={toggleTips}
              >
                <div className="flex-auto my-auto">LỜI KHUYÊN & CẢNH BÁO</div>
                <img
                  loading="lazy"
                  alt=""
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a20b583fc524c1afdb28207b9bc2fbcaafc28e514c302e5d668864cf5c97e49?"
                  className="shrink-0 w-6 aspect-square"
                />
              </div>
              {showTips && <TipsAndWarnings />}
              <div
                className="flex gap-5 justify-center py-3 pr-1.5 pl-px mt-3 text-xl border-b border-solid border-zinc-400 text-neutral-700 max-md:flex-wrap max-md:max-w-full cursor-pointer"
                onClick={toggleLocation}
              >
                <div className="flex-auto my-auto">SẢN PHẨM CÒN HÀNG TẠI</div>
                <img
                  loading="lazy"
                  alt=""
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/35d01c5cc7d2f8e99764e480ad8a21ca61347d99af30fc8107408dfda4294276?"
                  className="shrink-0 aspect-square w-[26px]"
                />
              </div>
              {openLocation && (
                <div className="flex flex-col">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className="p-4 m-2 bg-white shadow-lg rounded-lg "
                    >
                      <p
                        onClick={() => handleOpenLocation(location.mapUrl)}
                        className="text-lg font-semibold text-gray-800 cursor-pointer no-underline hover:underline"
                      >
                        {location.name}
                      </p>
                      <p className="text-gray-600 mt-2">{location.address}</p>
                    </div>
                  ))}
                  {showLocation && (
                    <Location
                      show={showLocation}
                      onClose={handleCloseLocation}
                      mapUrl={mapUrl}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryItem;
