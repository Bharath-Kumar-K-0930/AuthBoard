
import React from 'react';

interface IconProps {
  className?: string;
}

export const SearchIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
  </svg>
);

export const CartIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const StoreIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0 0 11.25 11.25H4.5A2.25 2.25 0 0 0 2.25 13.5V21M3 4.5h1.5M3 4.5V3M3 4.5v1.5m1.5-1.5h1.5m1.5 0h1.5m1.5 0h1.5m1.5 0h1.5m-7.5 0h1.5m1.5 0h1.5m1.5 0h1.5m1.5 0h1.5M12 21v-7.5a2.25 2.25 0 0 1 2.25-2.25H19.5A2.25 2.25 0 0 1 21.75 13.5V21m-9-16.5h1.5m1.5 0h1.5m1.5 0h1.5m1.5 0h1.5m1.5 0h1.5M21 4.5v1.5m0-1.5h-1.5m-1.5 0h-1.5m-1.5 0h-1.5m-1.5 0h-1.5m-1.5 0h-1.5" />
    </svg>
);
