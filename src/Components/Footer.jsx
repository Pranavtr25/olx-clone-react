import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <h2 className="text-lg font-bold mb-4">Popular Locations</h2>
            <ul className="text-sm">
              <li className="mb-2">Kolkata</li>
              <li className="mb-2">Mumbai</li>
              <li className="mb-2">Chennai</li>
              <li className="mb-2">Pune</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <h2 className="text-lg font-bold mb-4">Trending Locations</h2>
            <ul className="text-sm">
              <li className="mb-2">Bhubaneshwar</li>
              <li className="mb-2">Hyderabad</li>
              <li className="mb-2">Chandigarh</li>
              <li className="mb-2">Nashik</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <ul className="text-sm">
              <li className="mb-2">Contact Us</li>
              <li className="mb-2">Tech@OLX</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
            <h2 className="text-lg font-bold mb-4">OLX</h2>
            <ul className="text-sm">
              <li className="mb-2">Blog</li>
              <li className="mb-2">Help</li>
              <li className="mb-2">Sitemap</li>
              <li className="mb-2">Legal & Privacy information</li>
              <li className="mb-2">Vulnerability Disclosure Program</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-8">
          {[
            {
              href: "#",
              src: "https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1",
              alt: "CarDekho",
            },
            {
              href: "#",
              src: "https://statics.olx.in/external/base/img/cartrade/logo/olx.svg?v=1",
              alt: "Carwale",
            },
            {
              href: "#",
              src: "https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1",
              alt: "Bikewale",
            },
            {
              href: "#",
              src: "https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1",
              alt: "Car Trade",
            },
            {
              href: "#",
              src: "https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1",
              alt: "Mobility Outlook",
            },
          ].map((item, index) => (
            <div key={index} className="w-1/5 px-4 mb-6">
              <a
                href={item.href}
                className="block w-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 rounded-lg text-center py-2 px-4 text-sm font-medium text-gray-300"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-12 h-12 mx-auto"
                />
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            All rights reserved © 2006-2024 OLX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
