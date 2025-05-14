import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2D2C2C] text-white py-10 px-6 md:px-16">
      <div className="max-w-full">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 border-b border-gray-600 pb-10">
          {/* E-SHOP Info */}
          <div>
            <Link to="/">
            <h2 className="text-2xl font-bold text-[#E61B1B] mb-3">E-SHOP</h2>
            </Link>
            <p className="text-sm text-gray-300">
              Specializes in providing high-quality, stylish products for your wardrobe.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-2">CONTACT</h3>
            <div className="w-[60px] h-1 bg-[#E61B1B] mb-3" />
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📍 No. 164, Changyisu Str, Paung Township, Mon State, Myanmar</li>
              <li>📞 09-450756980, 09-697417662</li>
              <li>📧 heinhtetarkarmg@gmail.com</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-2">QUICK LINK</h3>
            <div className="w-[60px] h-1 bg-[#E61B1B] mb-3" />
            <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
              <Link to="/"><li>Home</li></Link>
              <Link to="/product"><li>Products</li></Link>
              <Link to="/about"><li>About</li></Link>
              <Link to="/contact"><li>Contact</li></Link>
              <Link to="/checkout"><li>Add to Cart</li></Link>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-2">FOLLOW US</h3>
            <div className="w-[60px] h-1 bg-[#E61B1B] mb-3" />
            <div className="flex space-x-4 mt-4">
              <FaFacebookF className="text-blue-500 text-2xl hover:scale-110 transition-transform duration-200" />
              <FaTwitter className="text-sky-400 text-2xl hover:scale-110 transition-transform duration-200" />
              <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-transform duration-200" />
              <FaYoutube className="text-red-600 text-2xl hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-300 mt-6">
          <p>
            ©2023 <span className="text-[#E61B1B] font-bold">E-SHOP</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
