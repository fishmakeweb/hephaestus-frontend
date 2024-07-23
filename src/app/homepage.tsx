"use client";
import ThreeScene from "./ThreeScene";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AuthService from "@/dbutils/userAPI/authservice";
import sendContactUs from "@/dbutils/userAPI/contactus"; // Adjust the import path as needed

interface ContactDTO {
  name: string;
  email: string;
  message: string;
}
function Homepage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contactDTO: ContactDTO = { name, email, message };

    try {
      const response = await sendContactUs(contactDTO);
      setResponseMessage(response);
      setError("");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      setError(error.message);
      setResponseMessage("");
    }
  };
  useEffect(() => {
    const handleAuthChange = () => {
      // Check if the authentication status has changed and act accordingly
      if (AuthService.isAuthenticated()) {
        router.refresh(); // Refresh the current page properly
      }
    };

    // Subscribe to authentication changes
    AuthService.subscribe(handleAuthChange);

    // Handle the token if provided in the URL query
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const username = urlParams.get("username");
    if (token && username) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      AuthService.notify(); // Notify any subscribers that authentication state might have changed
    }

    // Set page title
    document.title = "Hephaestus";

    // Manage the Three.js canvas
    const myCanvas = document.getElementById("myThreeJsCanvas");
    const canvasContainer = document.getElementById("threejs-container");
    if (myCanvas && canvasContainer) {
      canvasContainer.appendChild(myCanvas);
    }

    return () => {
      // Clean up: Unsubscribe to avoid memory leaks
      AuthService.unsubscribe(handleAuthChange);
    };
  }, []);
  return (
    <>
      {/* <div className="relative h-screen md:block hidden">
        <ThreeScene />
        <div className="absolute top-0 left-0 w-1/2 h-full mt-[30vh] text-white pl-[15vw]">
          <h3 className="text-3xl mt-8">Mùa hè rực rỡ: Thiết kế mẫu riêng ngay</h3>
          <h4 className="text-xl">Tạo ra sự lấp lánh độc đáo của bạn. Bắt đầu ngay hôm nay.</h4>
          <Link href={"/custom"}>
          <Button className="text-md border-white	border-2 hover:text-black hover:bg-white my-8 p-4">
            THIẾT KẾ NGAY
          </Button>
          </Link>
        </div>
      </div> */}
      <div className="flex flex-col bg-white">
        <div className="self-center mt-11 text-3xl md:text-2xl lg:text-4xl text-center text-black max-md:mt-10">
          Mua sắm theo danh mục
        </div>
        <div className="self-center mt-6 text-2xl italic text-center text-black">
          Thưởng thức những gì chúng tôi cung cấp.
        </div>
        <div className="self-center px-5 mt-20 w-full max-w-[1182px] max-md:mt-10 max-md:max-w-full">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 sm:grid-cols-1 sm:gap-0">
            <div className="flex flex-col w-full">
              {/* wedding ring page */}
              <div className="flex flex-col grow justify-center sm:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={100}
                    src={
                      "https://ap-south-1.linodeobjects.com/diamondshop-img/1721378591949_SP-1.jpg"
                    }
                    alt={"wedding-ring-sample"}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
                <div className="self-center mt-5 text-md sm:text-xl text-center text-black">
                  Dây chuyền
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              {/* Engagement Ring page */}
              <div className="flex flex-col grow justify-center sm:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={100}
                    src={
                      "https://ap-south-1.linodeobjects.com/diamondshop-img/1721378969518_eng-ring-sample.png"
                    }
                    alt={"eng-ring-sample"}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    priority
                  />
                </div>
                <div className="self-center mt-5 text-md sm:text-xl text-center text-black">
                  Nhẫn đính hôn
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              {/* Diamond page */}
              <div className="flex flex-col grow justify-center sm:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={200}
                    src={
                      "https://ap-south-1.linodeobjects.com/diamondshop-img/1721378906734_diamond.png"
                    }
                    alt={"diamond"}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
                <div className="self-center mt-5 text-md sm:text-xl text-center text-black">
                  Kim cương
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              {/* Jewelry page */}
              <div className="flex flex-col grow justify-center sm:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={200}
                    src={
                      "https://ap-south-1.linodeobjects.com/diamondshop-img/1721378748648_CDR-1.jpg"
                    }
                    alt={"jewelry-sample"}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
                <div className="self-center mt-5 text-md sm:text-xl text-center text-black">
                  Nhẫn thời trang
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="relative bg-center mt-40 bg-no-repeat bg-gray-700 bg-blend-multiply w-full">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://ap-south-1.linodeobjects.com/diamondshop-img/1721382503548_background-kim-cuong-trang-dep-nhat_035335879.webp"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              alt="Diamond Background"
              className="z-0"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>
          {/* Content Overlay */}
          <div className="px-4 mx-auto max-w-screen-xl text-center py-40 lg:py-56 relative z-10">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
              Khám phá sự lấp lánh trong từng góc cạnh
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
              Tại Hephaestus, chúng tôi chuyên khám phá vẻ đẹp của kim cương,
              nơi nghệ thuật thủ công, sự đổi mới và sự thanh lịch hội tụ để
              tiết lộ vẻ đẹp vượt thời gian và Giá tiền trị lâu dài.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Link
                href={"/custom"}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center hover:bg-black hover:text-white transition duration-300 border border-white rounded-lg bg-gray-100 hover:bg-black focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Bắt đầu
                <svg
                  aria-hidden="true"
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </section>
        <div className="h-[80vh] bg-gray-50 flex items-center">
          <section className="relative bg-cover bg-center py-32 w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://ap-south-1.linodeobjects.com/diamondshop-img/1721382557755_eb2ea5d47889eddbd3c8f452561430e6.webp"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                alt="Background"
              />
            </div>

            {/* Overlay Content */}
            <div className="container mx-auto text-left text-white relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 md:pr-16">
                  <h1 className="text-5xl text-black font-medium mb-6">
                    Bạn đã thấy hứng thú chưa?
                  </h1>
                  <p className="text-xl text-black mb-12">
                    Điền vào biểu mẫu để nhân viên của chúng tôi có thể hỗ trợ
                    bạn ngay lập tức.
                  </p>
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-20">
                  <form
                    className="bg-white p-8 rounded-lg shadow-md"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Tên
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nhập tên của bạn"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nhập email của bạn"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Tin nhắn
                      </label>
                      <textarea
                        id="message"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nhập tin nhắn của bạn"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gray-900 hover:bg-gray-400 hover:text-black transition duration-300 py-2 px-4 rounded-full w-full"
                    >
                      Gửi
                    </button>
                    {responseMessage && (
                      <p className="text-green-500 mt-2">{responseMessage}</p>
                    )}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-10 w-full bg-stone-950 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-full md:w-1/2 lg:w-[30vw] max-md:ml-0">
              <Image
                className="w-full aspect-[0.88] max-md:mt-10 max-md:max-w-full"
                width={150}
                height={200}
                src={
                  "https://ap-south-1.linodeobjects.com/diamondshop-img/1721383319340_ringyellowarticle.webp"
                }
                alt={"Article-img"}
                sizes="20vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="flex flex-col ml-5 w-full md:w-1/2 lg:w-3/5 max-md:ml-0">
              <div className="flex flex-col px-5 mt-11 text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-xl max-md:max-w-full">
                  BÀI VIẾT • MÙA HÈ 2024
                </div>
                <div className="mt-20 text-4xl font-bold max-md:mt-10 max-md:max-w-full">
                  Trong giờ vàng.
                </div>
                <div className="mt-8 text-2xl max-md:max-w-full">
                  Khi mặt trời chiếu sáng mọi thứ trong ánh sáng ấm áp, thần
                  tiên trong giờ vàng, cửa hàng kim cương của chúng tôi cung cấp
                  một nơi trú ẩn của vẻ đẹp vượt thời gian. Khám phá sự hấp dẫn
                  của bộ sưu tập được tuyển chọn tỉ mỉ của chúng tôi, nơi mỗi
                  viên kim cương lấp lánh với vẻ đẹp vô song. Dù bạn đang kỷ
                  niệm một dịp đặc biệt hay chỉ đơn giản là tự thưởng cho bản
                  thân, đội ngũ chuyên gia của chúng tôi luôn sẵn sàng giúp bạn
                  tìm thấy món trang sức hoàn hảo phù hợp với sự thanh lịch và
                  tinh tế.
                </div>
                <div className="justify-center mb-8 self-start hover:bg-white hover:text-black transition duration-300 p-7 mt-12 text-xl text-center border border-white border-solid max-md:mt-10">
                  ĐỌC THÊM
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full bg-stone-950 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col ml-5 w-full md:w-1/2 lg:w-3/5 max-md:ml-0">
              <div className="flex flex-col px-5 mt-11 text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-xl max-md:max-w-full">
                  BÀI VIẾT • MÙA HÈ 2024
                </div>
                <div className="mt-20 text-4xl font-bold max-md:mt-10 max-md:max-w-full">
                  Trong giờ vàng.
                </div>
                <div className="mt-8 text-2xl max-md:max-w-full">
                  Tạo một món trang sức độc đáo tại The Diamond Shop, chúng tôi
                  sẽ đưa bạn qua một quy trình từng bước, bắt đầu với một buổi
                  tư vấn riêng và kết thúc bằng một món trang sức độc đáo tuyệt
                  đẹp. Bắt đầu dự án của bạn bằng cách nhấp vào nút dưới đây và
                  cho chúng tôi biết món trang sức mơ ước của bạn trông như thế
                  nào!
                </div>
                <div className="justify-center mb-8 self-start hover:bg-white hover:text-black transition duration-300 p-7 mt-12 text-xl text-center border border-white border-solid max-md:mt-10">
                  ĐỌC THÊM
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 lg:w-[100vw] max-md:ml-0">
              <Image
                width={2000}
                height={1000}
                src={"/img/homepage/diamondimage.webp"}
                alt={"Article-img"}
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 w-full bg-stone-950 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-full md:w-1/2 lg:w-[60vw] max-md:ml-0">
              <Image
                width={2000}
                height={1000}
                src={"/img/homepage/thirdring.webp"}
                alt={"Article-img"}
                sizes="40vw"
                style={{
                  width: "auto",
                  height: "100%",
                }}
              />
            </div>
            <div className="flex flex-col ml-5 w-full md:w-1/2 lg:w-3/5 max-md:ml-0">
              <div className="flex flex-col px-5 mt-11 text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-xl max-md:max-w-full">
                  BÀI VIẾT • MÙA HÈ 2024
                </div>
                <div className="mt-20 text-4xl font-bold max-md:mt-10 max-md:max-w-full">
                  Trong giờ vàng.
                </div>
                <div className="mt-8 text-2xl max-md:max-w-full">
                  Khi mặt trời chiếu sáng mọi thứ trong ánh sáng ấm áp, thần
                  tiên trong giờ vàng, cửa hàng kim cương của chúng tôi cung cấp
                  một nơi trú ẩn của vẻ đẹp vượt thời gian. Khám phá sự hấp dẫn
                  của bộ sưu tập được tuyển chọn tỉ mỉ của chúng tôi, nơi mỗi
                  viên kim cương lấp lánh với vẻ đẹp vô song. Dù bạn đang kỷ
                  niệm một dịp đặc biệt hay chỉ đơn giản là tự thưởng cho bản
                  thân, đội ngũ chuyên gia của chúng tôi luôn sẵn sàng giúp bạn
                  tìm thấy món trang sức hoàn hảo phù hợp với sự thanh lịch và
                  tinh tế.
                </div>
                <div className="justify-center mb-8 self-start hover:bg-white hover:text-black transition duration-300 p-7 mt-12 text-xl text-center border border-white border-solid max-md:mt-10">
                  ĐỌC THÊM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
