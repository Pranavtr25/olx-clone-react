import React from "react";
import ProductSlider from "./ProductSlider";

const ProductContainer = ({singleProductData}) => {
  return (
    <>
      <div className=" flex flex-col p-10 lg:flex-row items-center">
        <div className="mx-2 w-5/6 p-2 lg:w-2/3">
          <div className="bg-white h-auto m-3 rounded-l p-3 overflow-hidden">
            <div className="h-12 w-full bg-[#ceddff] flex items-center justify-center rounded-md mb-2">
              <p className="text-[#3d77ff] font-medium whitespace-nowrap flex items-center lg:font-bold">
                <i className="fa-solid fa-certificate mr-2"></i> VERIFIED SELLER
              </p>
            </div>
            <h1 className="text-xl font-semibold mb-2 truncate lg:text-2xl lg:font-bold">
              {singleProductData?.brand}
            </h1>
            <h4 className="mb-1 flex items-center">
              {/* <i className="fa-solid fa-gas-pump mr-2"></i> */}
               {singleProductData?.title}
            </h4>
          </div>

          <div className="bg-white m-3 rounded-l p-3">
            <div className="text-xl font-semibold text-gray-400 my-3 lg:text-3xl lg:font-bold">
              Overview
            </div>
            <hr className="my-2" />
            <div className="flex flex-col items-start bg-gray-50 p-3 rounded-md mt-3">
              <span className="flex items-center mb-2">
                <i className="fa-solid fa-person mr-2"></i>
                Person
              </span>
              <span className="flex items-center">
                <i className="fa-solid fa-location-dot mr-2"></i>
                Location
              </span>
            </div>
          </div>

          <div className="bg-white m-3 rounded-l p-3">
            <div className="text-xl font-semibold text-gray-400 my-3 lg:text-3xl lg:font-bold">
              Description
            </div>
            <hr className="my-2" />
            <ul className="list-disc list-inside p-3">
              <li className="mb-2">{singleProductData?.description}</li>
              {/* <li className="mb-2">Bullet point three</li> */}
            </ul>
          </div>
        </div>
        <div className="mx-2 w-5/6 flex-row justify-center items-center p-2 lg:w-1/3">
          <div className="bg-white h-52 m-3 rounded-l p-3 flex flex-col justify-between overflow-hidden">
            <div className="text-xl font-semibold mb-4 lg:text-4xl lg:font-bold items-center">{singleProductData?.price}</div>
            <button className="bg-black text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black rounded-md py-2 transition-colors duration-300">
              Make Offer
            </button>
          </div>

          <div className="bg-white h-52 m-3 rounded-l p-3 flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <i className="fa-regular fa-user text-4xl mr-2"></i>
              <span className="text-xl font-semibold lg:text-3xl lg:font-bold">user</span>
            </div>
            <button className="bg-black text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black rounded-md py-2 transition-colors duration-300">
              Make Offer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
