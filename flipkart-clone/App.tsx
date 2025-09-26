
import React from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import HeroCarousel from './components/HeroCarousel';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import { electronics, beauty, homeAndFurniture } from './constants';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <CategoryBar />
        <div className="p-2 sm:p-4">
          <HeroCarousel />
        </div>
        <div className="p-2 sm:p-4 space-y-4">
          <ProductSection title="Best of Electronics" products={electronics} />
          <ProductSection title="Beauty, Food, Toys & more" products={beauty} />
          <ProductSection title="Top Deals on Home & Furniture" products={homeAndFurniture} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
