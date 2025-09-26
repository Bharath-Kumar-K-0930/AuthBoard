
import React from 'react';
import { footerLinks } from '../constants';

const FooterColumn: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
  <div>
    <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href="#" className="text-white text-sm hover:underline">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#172337] text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <FooterColumn title="About" links={footerLinks.about} />
          <FooterColumn title="Help" links={footerLinks.help} />
          <FooterColumn title="Consumer Policy" links={footerLinks.consumerPolicy} />
          <FooterColumn title="Social" links={footerLinks.social} />
          <div className="col-span-2 md:col-span-1 border-l border-gray-700 pl-6">
             <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Mail Us</h3>
             <p className="text-white text-sm leading-relaxed">
              Flipkart Internet Private Limited,
              Buildings Alyssa, Begonia &
              Clove Embassy Tech Village,
              Outer Ring Road, Devarabeesanahalli Village,
              Bengaluru, 560103,
              Karnataka, India
             </p>
          </div>
           <div className="col-span-2 md:col-span-1">
             <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Registered Office Address</h3>
             <p className="text-white text-sm leading-relaxed">
              Flipkart Internet Private Limited,
              Buildings Alyssa, Begonia &
              Clove Embassy Tech Village,
              Outer Ring Road, Devarabeesanahalli Village,
              Bengaluru, 560103,
              Karnataka, India
              CIN : U51109KA2012PTC066107
              Telephone: <a href="tel:044-45614700" className="text-blue-400">044-45614700</a>
             </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <a href="#" className="hover:underline">Become a Seller</a>
            <a href="#" className="hover:underline">Advertise</a>
            <a href="#" className="hover:underline">Gift Cards</a>
            <a href="#" className="hover:underline">Help Center</a>
          </div>
          <div className="mb-4 sm:mb-0">&copy; 2007-{new Date().getFullYear()} Flipkart.com</div>
          <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payment methods" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
