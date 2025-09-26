
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <div className="bg-white shadow-sm rounded-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <a href="#" className="text-sm font-semibold text-white bg-[#2874f0] px-5 py-2 rounded-sm uppercase">View All</a>
      </div>
      <div className="flex overflow-x-auto p-4 space-x-4 scrollbar-hide">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
