import React from 'react';

export default function Footer() {
  return (
    <div className="flex flex-col pt-14 mt-8 w-full border-solid bg-gray-100 border-t-[5px] border-zinc-300 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col px-20 w-full max-md:px-5 max-md:max-w-full">
        <div className="max-md:mr-1.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
              <div className="max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-sm text-neutral-700 max-md:mt-10">
                      <div className="text-sm font-bold text-black">
                        CUSTOMER SERVICES
                      </div>
                      <div className="mt-6">Contact Us</div>
                      <div className="mt-5">Track your Order</div>
                      <div className="mt-5">Shipping & Returns</div>
                      <div className="mt-6">Frequently Asked Questions</div>
                      <div className="mt-5">Schedule an appointment</div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm text-neutral-700 max-md:mt-10">
                      <div className="text-sm font-bold text-black">
                        ABOUT US
                      </div>
                      <div className="mt-5">Origins</div>
                      <div className="mt-5">Our Purpose</div>
                      <div className="mt-5">Careers</div>
                      <div className="mt-5">Sustainability</div>
                      <div className="mt-4">Giving Back</div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm text-neutral-700 max-md:mt-10">
                      <div className="text-sm font-bold text-black">
                        MATERIAL CARE
                      </div>
                      <div className="mt-5">Jewelry Repair</div>
                      <div className="mt-4">Ring Sizing</div>
                      <div className="mt-5">Metal Allergy Resources</div>
                      <div className="mt-4">Styling Tips</div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[23%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm text-neutral-700 max-md:mt-10">
                      <div className="text-sm font-bold text-black">
                        MAIN LOCATIONS
                      </div>
                      <div className="mt-5">Chicago, IL</div>
                      <div className="mt-4">San Francisco, CA</div>
                      <div className="mt-5">New York, NY</div>
                      <div className="mt-5">Seattle, WA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10">
                <div className="text-2xl font-bold text-black">
                  You can be one step ahead.
                </div>
                <div className="mt-2.5 text-xl text-black">
                  Sign up to hear about our updates on the dot.
                </div>
                <div className="flex gap-5 p-3.5 mt-8 bg-white border border-solid border-stone-300 font-[344]">
                  <input type='email' placeholder='Your email address' className="flex-auto text-sm text-stone-400 outline-none focus:outline-none" />
                    <div className="text-sm text-stone-400">SIGN UP</div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-8" style={{ gap: '68px' }}>
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/transparent-on-dark-grey/500/icon-04-512.png" // Replace with your actual path
                    alt="Social Icon 1"
                    className="aspect-square w-8" // Adjust size as needed
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Twitter_glyph_svg-256.png" // Replace with your actual path
                    alt="Social Icon 2"
                    className="aspect-square w-8" // Adjust size as needed
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/social-media-2253/17/Vector-2-256.png" // Replace with your actual path
                    alt="Social Icon 3"
                    className="aspect-square w-8" // Adjust size as needed
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Youtube_glyph_svg-256.png" // Replace with your actual path
                    alt="Social Icon 4"
                    className="aspect-square w-8" // Adjust size as needed
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-256.png" // Replace with your actual path
                    alt="Social Icon 5"
                    className="aspect-square w-8" // Adjust size as needed
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-11 max-w-full w-[767px] max-md:flex-wrap max-md:mt-10">
          <div className="flex-auto text-xs text-stone-500 max-md:max-w-full">
            PRIVACY POLICY • TERMS OF USE • SITEMAP • DO NOT SELL MY
            INFORMATION • COOKIES
          </div>
        </div>
      </div>
      <div className="mt-10 w-full bg-zinc-300 min-h-[18px] max-md:max-w-full" />
    </div>
  );
}

