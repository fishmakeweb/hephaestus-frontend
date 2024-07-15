"use client"
import ThreeScene from "./ThreeScene"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
function Homepage() {
  const router = useRouter();
  useEffect(() => {
    document.title = "Hephaestus";
    router.refresh();
    const myCanvas = document.getElementById("myThreeJsCanvas");
    const canvasContainer = document.getElementById("threejs-container");

    if (myCanvas && canvasContainer) {
      canvasContainer.appendChild(myCanvas);
    }
  }, []);
  const handleClick = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in to custom your jewelry.");
      router.push("/login");
      return;
    } else {
      router.push("/custom");
    }
  };
  return (
    <>
      <div className="relative h-screen">
        <ThreeScene />
        <div className="absolute top-0 left-0 w-1/2 h-full mt-[30vh] text-white pl-[15vw]">
          <h3 className="text-3xl mt-8">Summer Brilliance: Custom Diamond Jewelry</h3>
          <h4 className="text-xl">Create your unique sparkle. Start today.</h4>
          <Button className="text-md border-white	border-2 hover:text-black hover:bg-white my-8 p-4">DESIGN YOURS NOW</Button>
        </div>
      </div>
      <div className="flex flex-col bg-white">
        <div className="self-center mt-11 text-md md:text-2xl lg:text-4xl text-center text-black max-md:mt-10">
          Shop by category
        </div>
        <div className="self-center mt-6 text-3xl italic text-center text-black">
          Indulge in what we offer.
        </div>
        <div className="self-center px-5 mt-20 w-full max-w-[1182px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              {/* wedding ring page */}
              <div className="flex flex-col grow justify-center max-md:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={100}
                    src={'/img/homepage/s-l1200.webp'}
                    alt={'wedding-ring-sample'}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
                <div className="self-center mt-5 text-2xl text-center text-black">
                  Diamond Chains
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              {/* Engagement Ring page */}
              <div className="flex flex-col grow justify-center max-md:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={100}
                    src={'/img/homepage/eng-ring-sample.png'}
                    alt={'eng-ring-sample'}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    priority
                  />
                </div>
                <div className="self-center mt-5 text-2xl text-center text-black">
                  Engagement Ring
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              {/* Diamond page */}
              <div className="flex flex-col grow justify-center max-md:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={200}
                    src={'/img/homepage/diamond.png'}
                    alt={'jdiamond'}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>

                <div className="self-center mt-5 text-2xl text-center text-black">
                  Diamond
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              {/* Jewelry page */}
              <div className="flex flex-col grow justify-center max-md:mt-10">
                <div className="flex flex-col justify-center shadow-sm bg-stone-300">
                  <Image
                    className="w-full aspect-[0.9]"
                    width={150}
                    height={200}
                    src={'/img/homepage/jewerly-sample.png'}
                    alt={'jewerly-sample'}
                    sizes="10vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
                <div className="self-center mt-5 text-2xl text-center text-black">
                  Jewelry
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="relative bg-center mt-40 bg-no-repeat bg-gray-700 bg-blend-multiply w-full">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/homepage/background-kim-cuong-trang-dep-nhat_035335879.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Diamond Background"
              className="z-0"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>
          {/* Content Overlay */}
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 relative z-10">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Discovering Brilliance in Every Facet</h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">At Hephaetus, we specialize in uncovering the allure of diamonds, where craftsmanship, innovation, and elegance converge to reveal timeless beauty and lasting value.</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <button onClick={handleClick} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center hover:bg-black hover:text-white transition duration-300 border border-white rounded-lg bg-gray-100 hover:bg-black focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
              <Link href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                Learn more
              </Link>
            </div>
          </div>
        </section>
        <div className="h-[80vh] bg-gray-50 flex items-center">
          {/* <section
          className="bg-cover bg-center py-32 w-full"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/eb/2e/a5/eb2ea5d47889eddbd3c8f452561430e6.jpg')",
          }}
        >
          <div className="container mx-auto text-left text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 md:pr-16">
                <h1 className="text-5xl text-black font-medium mb-6">
                  Are you interested yet?
                </h1>
                <p className="text-xl text-black mb-12">
                  Fill in the form so our staff can support you right away.
                </p>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-20">
                <form className="bg-white p-8 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your name"
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
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-400 hover:text-black transition duration-300 py-2 px-4 rounded-full w-full"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section> */}
          <section className="relative bg-cover bg-center py-32 w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/img/homepage/eb2ea5d47889eddbd3c8f452561430e6.jpg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Background"
              />
            </div>

            {/* Overlay Content */}
            <div className="container mx-auto text-left text-white relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 md:pr-16">
                  <h1 className="text-5xl text-black font-medium mb-6">Are you interested yet?</h1>
                  <p className="text-xl text-black mb-12">
                    Fill in the form so our staff can support you right away.
                  </p>
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-20">
                  <form className="bg-white p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                      <textarea
                        id="message"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your message"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gray-900 hover:bg-gray-400 hover:text-black transition duration-300 py-2 px-4 rounded-full w-full"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mt-10 w-full bg-stone-950 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-full md:w-1/2 lg:w-[25vw] max-md:ml-0">
              <Image
                className="w-full aspect-[0.88] max-md:mt-10 max-md:max-w-full"
                width={150}
                height={200}
                src={'/img/homepage/ringyellowarticle.webp'}
                alt={'Article-img'}
                sizes="20vw"
                style={{
                  width: "100%",
                  height: "auto",
                }} />
            </div>
            <div className="flex flex-col ml-5 w-full md:w-1/2 lg:w-3/5 max-md:ml-0">
              <div className="flex flex-col px-5 mt-11 text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-xl max-md:max-w-full">
                  ARTICLE • SUMMER 2024
                </div>
                <div className="mt-20 text-4xl font-bold max-md:mt-10 max-md:max-w-full">
                  During the golden hour.
                </div>
                <div className="mt-8 text-2xl max-md:max-w-full">
                  As the sun bathes everything in a warm, ethereal glow during the golden hour, our diamond boutique offers a sanctuary of timeless beauty. Discover the allure of our meticulously curated collection, where each diamond sparkles with unparalleled brilliance. Whether youre celebrating a special occasion or simply treating yourself, our expert team is dedicated to helping you find the perfect piece that resonates with elegance and sophistication.
                </div>
                <div className="justify-center mb-8 self-start hover:bg-white hover:text-black transition duration-300 p-7 mt-12 text-xl text-center border border-white border-solid max-md:mt-10">
                  READ MORE
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
                  ARTICLE • SUMMER 2024
                </div>
                <div className="mt-20 text-4xl font-bold max-md:mt-10 max-md:max-w-full">
                  During the golden hour.
                </div>
                <div className="mt-8 text-2xl max-md:max-w-full">
                  Create a Unique
                  Custom Piece
                  At The Diamond Shop, we take you through a step by step process, beginning with a one-on-one consultation, and ending with a stunning one of a kind piece of jewelry.

                  Start your project off by clicking the button below and letting us know what your dream piece looks like!
                </div>
                <div className="justify-center mb-8 self-start hover:bg-white hover:text-black transition duration-300 p-7 mt-12 text-xl text-center border border-white border-solid max-md:mt-10">
                  READ MORE
                </div>

              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 lg:w-[100vw] max-md:ml-0">
              <Image
                width={2000}
                height={1000}
                src={'/img/homepage/diamondimage.webp'}
                alt={'Article-img'}
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "100%",
                }} />
            </div>
          </div>
        </div>

        <div className="mt-10 w-full bg-stone-950 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-full md:w-1/2 lg:w-[60vw] max-md:ml-0">
              <Image
                width={2000}
                height={1000}
                src={'/img/homepage/thirdring.webp'}
                alt={'Article-img'}
                sizes="40vw"
                style={{
                  width: "auto",
                  height: "100%",
                }} />
            </div>
            <div className="flex flex-col ml-5 w-full md:w-1/2 lg:w-3/5 max-md:ml-0">
              <div className="flex flex-col px-5 mt-11 text-white max-md:mt-10 max-md:max-w-full">
                <div className="text-xl max-md:max-w-full">
                  ARTICLE • SUMMER 2024
                </div>
                <div className="mt-20 text-4xl font-bold max-md:mt-10 max-md:max-w-full">
                  During the golden hour.
                </div>
                <div className="mt-8 text-2xl max-md:max-w-full">
                  As the sun bathes everything in a warm, ethereal glow during the golden hour, our diamond boutique offers a sanctuary of timeless beauty. Discover the allure of our meticulously curated collection, where each diamond sparkles with unparalleled brilliance. Whether youre celebrating a special occasion or simply treating yourself, our expert team is dedicated to helping you find the perfect piece that resonates with elegance and sophistication.
                </div>
                <div className="justify-center mb-8 self-start hover:bg-white hover:text-black transition duration-300 p-7 mt-12 text-xl text-center border border-white border-solid max-md:mt-10">
                  READ MORE
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
