
import { Product, Category } from './types';

export const categories: Category[] = [
  { name: 'Grocery' },
  { name: 'Mobiles' },
  { name: 'Fashion' },
  { name: 'Electronics' },
  { name: 'Home & Furniture' },
  { name: 'Appliances' },
  { name: 'Travel' },
  { name: 'Beauty, Toys & More' },
  { name: 'Two Wheelers' },
];

export const carouselImages: string[] = [
  'https://picsum.photos/id/10/1600/400',
  'https://picsum.photos/id/20/1600/400',
  'https://picsum.photos/id/30/1600/400',
  'https://picsum.photos/id/40/1600/400',
];

export const electronics: Product[] = [
  { name: 'Top Mirrorless Cameras', image: 'https://picsum.photos/id/100/200/200', price: 'Shop Now!', brand: 'Canon, Sony, Fujifilm...' },
  { name: 'Projectors', image: 'https://picsum.photos/id/110/200/200', price: 'From ₹9999', brand: 'ZEBRONICS' },
  { name: 'Monitors', image: 'https://picsum.photos/id/120/200/200', price: 'From ₹6599', brand: 'SAMSUNG' },
  { name: 'Printers', image: 'https://picsum.photos/id/130/200/200', price: 'From ₹2336', brand: 'HP' },
  { name: 'Best Selling Monitors', image: 'https://picsum.photos/id/140/200/200', price: 'From ₹8279', brand: 'LG' },
  { name: 'Top Selling Trimmers', image: 'https://picsum.photos/id/150/200/200', price: 'From ₹399', brand: 'realme, Mi & more' },
  { name: 'Premium Power Banks', image: 'https://picsum.photos/id/160/200/200', price: 'Shop Now', brand: 'Ambrane, Mi & more' },
];

export const beauty: Product[] = [
  { name: 'Top Selling Stationery', image: 'https://picsum.photos/id/200/200/200', price: 'From ₹49', brand: 'Pens, Notebooks & more' },
  { name: 'Remote Control Toys', image: 'https://picsum.photos/id/210/200/200', price: 'Up to 80% Off', brand: 'Miss & Chief' },
  { name: 'Soft Toys', image: 'https://picsum.photos/id/220/200/200', price: 'Up to 70% Off', brand: 'Best-sellers' },
  { name: 'Coffee Mugs', image: 'https://picsum.photos/id/230/200/200', price: 'From ₹99', brand: 'Popular brands' },
  { name: 'Musical Toys', image: 'https://picsum.photos/id/240/200/200', price: 'Up to 70% Off', brand: 'Best-sellers' },
  { name: 'Dry Fruits', image: 'https://picsum.photos/id/250/200/200', price: 'Up to 75% Off', brand: 'Happilo, Farmley & more' },
  { name: 'Chocolates', image: 'https://picsum.photos/id/260/200/200', price: 'Up to 60% Off', brand: 'Cadbury, Ferrero Rocher' },
];

export const homeAndFurniture: Product[] = [
  { name: 'Blankets', image: 'https://picsum.photos/id/300/200/200', price: 'Up to 80% off', brand: 'Best Selling Range' },
  { name: 'Kitchen & Dining', image: 'https://picsum.photos/id/310/200/200', price: 'From ₹99', brand: 'Best Deals' },
  { name: 'Wall Decor', image: 'https://picsum.photos/id/320/200/200', price: 'Up to 80% off', brand: 'Paintings, Clocks & more' },
  { name: 'Tools & Utility', image: 'https://picsum.photos/id/330/200/200', price: 'From ₹99', brand: 'Hand Tools, Power Tools...' },
  { name: 'Home Lighting', image: 'https://picsum.photos/id/340/200/200', price: 'Up to 80% off', brand: 'Wall, Ceiling Lights & more' },
  { name: 'Sofas', image: 'https://picsum.photos/id/350/200/200', price: 'From ₹4,999', brand: 'Premium Collection' },
  { name: 'Wardrobes', image: 'https://picsum.photos/id/360/200/200', price: 'From ₹6,190', brand: 'Space-saving Designs' },
];

export const footerLinks = {
  about: ['Contact Us', 'About Us', 'Careers', 'Flipkart Stories', 'Press', 'Corporate Information'],
  help: ['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ', 'Report Infringement'],
  consumerPolicy: ['Return Policy', 'Terms Of Use', 'Security', 'Privacy', 'Sitemap', 'Grievance Redressal', 'EPR Compliance'],
  social: ['Facebook', 'Twitter', 'YouTube'],
};
