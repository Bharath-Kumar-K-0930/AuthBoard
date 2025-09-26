
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex-shrink-0 w-48 text-center border rounded-md p-2 hover:shadow-lg transition-shadow cursor-pointer">
      <img src={product.image} alt={product.name} className="w-36 h-36 mx-auto object-contain mb-2" />
      <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
      <p className="text-green-600 font-medium text-sm">{product.price}</p>
      <p className="text-gray-500 text-xs truncate">{product.brand}</p>
    </div>
  );
};

export default ProductCard;
