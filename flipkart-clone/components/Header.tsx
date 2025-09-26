
import React from 'react';
import { SearchIcon, UserIcon, CartIcon, ChevronDownIcon, StoreIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-[#2874f0] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col">
              <a href="#" className="text-2xl font-bold italic">Flipkart</a>
              <a href="#" className="text-xs text-gray-200 italic flex items-center">
                Explore <span className="text-yellow-400 font-semibold ml-1">Plus</span>
                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg" alt="Plus" className="w-2 h-2 ml-1" />
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4 hidden sm:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-white text-[#2874f0] rounded-r-md">
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-6">
             <a href="#" className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-blue-700 rounded-md transition-colors">
              <StoreIcon className="w-6 h-6"/>
              <span className="font-semibold">Become a Seller</span>
            </a>
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-blue-700 rounded-md transition-colors cursor-pointer">
              <UserIcon className="w-6 h-6" />
              <span className="font-semibold">Sign in</span>
              <ChevronDownIcon />
            </div>
            <a href="#" className="flex items-center space-x-2 px-3 py-2 hover:bg-blue-700 rounded-md transition-colors">
              <CartIcon className="w-6 h-6"/>
              <span className="font-semibold">Cart</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
