import React, { useState } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import bag from "../assets/productimg/black-bag.png";
import hoodie from "../assets/productimg/hoodie.png";
import shoes from "../assets/productimg/shoes.png";
import perfume from "../assets/productimg/veleno-perfume.png";
import hat from "../assets/productimg/hat.png";
import watch from "../assets/productimg/watch.png";


const products = [
  {
    id:1,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:2,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:3,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:4,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:5,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:6,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:7,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:8,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:9,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:10,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:11,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:12,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:13,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:14,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:15,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:16,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:17,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:18,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:19,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:20,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:21,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:22,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:23,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:24,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },

  {
    id:25,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:26,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:27,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:28,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:29,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:30,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:31,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:32,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:33,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:34,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:35,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:36,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:37,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:38,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:39,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:40,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:41,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:42,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:43,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:44,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:45,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:46,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:47,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:48,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:49,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:50,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:51,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:52,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:53,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:54,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:55,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:56,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:57,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:58,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:59,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:60,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:61,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:62,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:63,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:64,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:65,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:66,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:67,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:68,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:69,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:70,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:71,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },

  {
    id:72,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:73,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:74,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:75,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:76,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:77,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:78,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:79,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:80,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:81,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:82,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:83,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:84,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:85,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:86,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:87,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:88,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:89,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:90,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
  },
  {
    id:91,
    name: "Converse Shoes",
    price: 540000,
    image: shoes
  },
  {
    id:92,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
  },
  {
    id:93,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  },
  {
    id:94,
    name: "hat",
    price: 850000,
    image: hat,
  },
  {
    id:95,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
  },
  {
    id:96,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
  }
];

const categories = [
  "Clothes",
  "Watches",
  "Bags",
  "Glasses",
  "Cosmetics",
  "Perfume",
  "Footwear",
];

const Product = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // new
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;
 
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="min-h-screen overflow-x-hidden bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="md:fixed w-36 md:mt-14 mt-12 lg:w-36 h-auto lg:h-[420px] sm:mt-10 bg-[#F4F4F4] shadow-[9px_5px_9px_rgba(0,0,0,0.25)] rounded-tr-[86px] rounded-br-[86px] p-6">
            <h2 className="font-semibold text-lg mb-1">Categories</h2>
            <div className="w-[50px] h-[2px] bg-[#A51910] mb-4"></div>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              { categories.map((category) => (
                <li className="pb-4" key={category}>{category}</li>
              ))}
            </ul>
          </div>

          {/* Product Listing */}
          <main className="flex-1  sm:p-6 md:ml-44 m-9">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 relative">
              <div className="w-full">
                <h1 className="text-3xl font-bold pb-2 mb-2">All Products</h1>
                <div className="w-[50px] ml-12 h-[2px] bg-[#A51910] mb-4"></div>
              </div>
              <div className="relative mt-2 sm:mt-0">
                <button
                  className="flex items-center gap-2 px-4 w-36 py-2 border border-[#F4F4F4] rounded-lg text-sm hover:bg-gray-100"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Sort by Price <ChevronDown className="w-4 h-4" />
                </button>
                {showDropdown && (
                  <div className="right-0 mt-2 w-48 bg-[#F4F4F4] border border-gray-200 rounded shadow-lg z-10 absolute">
                    <ul className="text-sm text-gray-700">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSortOrder("all");
                          setShowDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        All Products
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSortOrder("low");
                          setShowDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        Low to High
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSortOrder("high");
                          setShowDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        High to Low
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg w-full max-w-full h-full mx-auto rounded-[27px] border border-gray-200"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full h-full flex flex-col items-start hover:shadow-xl transition-all"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover mb-4 self-center rounded-[27px]"
                    />
                    <h3 className="text-sm font-medium mb-1 pl-4">{product.name}</h3>
                    <div className="flex items-center justify-between w-full pl-4 pb-4">
                      <div className="flex items-center gap-1">
                        <p className="text-red-600 text-sm">{product.price.toLocaleString()}</p>
                        <span className="text-black text-sm">MMK</span>
                      </div>
                      <button className="w-8 h-8 mr-4 flex items-center justify-center bg-[#A51910] text-white rounded-full hover:bg-red-600">
                        +
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#A51910] border border-[#A51910] hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100 ${
                    currentPage === index + 1
                      ? "bg-[#A51910] text-white"
                      : "text-[#A51910] border-[#A51910]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#A51910] border border-[#A51910] hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
