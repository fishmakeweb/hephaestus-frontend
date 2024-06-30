import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="flex flex-col pt-8 mt-6 w-full border-solid bg-gray-100 border-t-[5px] border-zinc-300 max-md:mt-8 max-md:max-w-full">
      <div className="flex flex-col px-16 w-full max-md:px-4 max-md:max-w-full">
        <div className="max-md:mr-1.5 max-md:max-w-full">
          <div className="flex gap-4 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
              <div className="max-md:mt-8 max-md:max-w-full">
                <div className="flex gap-4 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-sm text-neutral-700 max-md:mt-8">
                      <div className="text-sm font-bold text-black">
                        CUSTOMER SERVICES
                      </div>
                      <Link href="/contact" className="mt-4">Contact Us</Link>
                      <div className="mt-4">Track your Order</div>
                      <div className="mt-4">Frequently Asked Questions</div>
                      <div className="mt-4">Schedule an appointment</div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-4 w-[16%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm text-neutral-700 max-md:mt-8">
                      <div className="text-sm font-bold text-black">
                        ABOUT US
                      </div>
                      <div className="mt-4">Our Purpose</div>
                      <div className="mt-4">Careers</div>
                      <div className="mt-4">Sustainability</div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-4 w-[23%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col text-sm text-neutral-700 max-md:mt-8">
                      <div className="text-sm font-bold text-black">
                        MAIN LOCATIONS
                      </div>
                      <div className="mt-4">Chicago, IL</div>
                      <div className="mt-4">San Francisco, CA</div>
                      <div className="mt-4">New York, NY</div>
                      <div className="mt-4">Seattle, WA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-4 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-8">
                <div className="text-xl font-bold text-black">
                  You can be one step ahead.
                </div>
                <div className="mt-2 text-lg text-black">
                  Sign up to hear about our updates on the dot.
                </div>
                <div className="flex gap-4 p-3 mt-6 bg-white border border-solid border-stone-300">
                  <input type='email' placeholder='Your email address' className="flex-auto text-sm text-stone-400 outline-none focus:outline-none" />
                  <div className="text-sm text-stone-400">SIGN UP</div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-6">
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/transparent-on-dark-grey/500/icon-04-512.png"
                    alt="Social Icon 1"
                    className="aspect-square w-8"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Twitter_glyph_svg-256.png"
                    alt="Social Icon 2"
                    className="aspect-square w-8"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/social-media-2253/17/Vector-2-256.png"
                    alt="Social Icon 3"
                    className="aspect-square w-8"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/512/BW_Youtube_glyph_svg-256.png"
                    alt="Social Icon 4"
                    className="aspect-square w-8"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn3.iconfinder.com/data/icons/picons-social/57/11-linkedin-256.png"
                    alt="Social Icon 5"
                    className="aspect-square w-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-8 max-w-full w-[767px] max-md:flex-wrap max-md:mt-8">
          <div className="flex-auto text-xs text-stone-500 max-md:max-w-full">
            PRIVACY POLICY • TERMS OF USE • SITEMAP • COOKIES
          </div>
        </div>
      </div>
      <div className="mt-8 w-full bg-zinc-300 min-h-[18px] max-md:max-w-full" />
    </div>
  );
}
