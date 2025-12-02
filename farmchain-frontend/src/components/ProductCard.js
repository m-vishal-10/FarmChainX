import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h4 className="font-semibold text-gray-800 dark:text-white">{product.name}</h4>
      <p className="text-gray-600 dark:text-gray-300">Type: {product.type}</p>
      <p className="text-gray-600 dark:text-gray-300">Quantity: {product.quantity}</p>
      <p className="text-gray-600 dark:text-gray-300">Location: {product.location}</p>
      <p className="text-gray-600 dark:text-gray-300">Date: {product.date}</p>
    </div>
  );
};

export default ProductCard;
