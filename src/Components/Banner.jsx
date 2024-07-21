import React, { useState } from "react";

const Banner = ({ singleProductData }) => {
  const slides = [singleProductData?.image1, singleProductData?.image2, singleProductData?.image3]
  const [currentIndex, setCurrentIndex] = useState(0);

  if (slides.length < 2) {
    return (
      <div className="relative w-11/12 max-w-screen-xl mx-auto my-8">
        <div className="relative h-52 md:h-96 overflow-hidden rounded-lg">
          {slides.map((slide, index) => (
            <div key={index} className="absolute inset-0">
              <img
                src={slide}
                className="block w-full h-full object-cover"
                alt={`Carousel ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="relative w-3/4 max-w-screen-xl mx-auto my-8" data-carousel="static">
        <div className="relative h-52 md:h-[30em] overflow-hidden rounded-lg">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide}
                className="block w-full h-full object-cover"
                alt={`Carousel ${index + 1}`}
              />
            </div>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-2 focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1L1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-2 focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default Banner;
