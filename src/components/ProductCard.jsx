import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <img src={product.image} alt={product.name} className="w-full h-[8rem] sm:h-[12rem] object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-700 mt-2 line-clamp-1">{product.description}</p>
        <p className="text-green-600 font-bold mt-4">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
