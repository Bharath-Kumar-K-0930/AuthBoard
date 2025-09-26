
import React from 'react';
import { categories } from '../constants';
import { ChevronDownIcon } from './Icons';

const CategoryBar: React.FC = () => {
  return (
    <div className="bg-white shadow-md hidden lg:block">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-12">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center space-x-1 cursor-pointer group">
              <span className="font-semibold text-gray-700 group-hover:text-[#2874f0]">{category.name}</span>
              {category.name !== 'Travel' && category.name !== 'Grocery' && <ChevronDownIcon className="w-4 h-4 text-gray-500 group-hover:text-[#2874f0] group-hover:rotate-180 transition-transform"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
