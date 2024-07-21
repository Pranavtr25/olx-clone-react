import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ image, price, brand, category, id }) => {

  return (
    <>
      <Link to={'/product/'+id}>
      <div className="w-64 h-80 border border-gray-300 rounded-lg shadow-md flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center">
          <img src={image} alt={brand} className="w-full h-48 object-cover rounded-t-lg" />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <h3 className="text-lg font-bold">{brand}</h3>
          <p className="text-sm text-gray-600">{category}</p>
          <p className="text-lg font-semibold">${price}</p>
        </div>
      </div>
      </Link>
    </>
  );
};

export default ProductCard;
