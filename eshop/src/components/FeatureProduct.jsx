import React from "react";
// import ArrowR from "../assets/arrowR.png"
import bag from "../assets/productimg/black-bag.png";
import hoodie from "../assets/productimg/hoodie.png";
import shoes from "../assets/productimg/shoes.png";
import perfume from "../assets/productimg/veleno-perfume.png";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "CHANEL Mini Flap Bag",
    description: "Lambskin & gold-tone metal, black",
    price: "9,900,000 ",
    image: bag,
  },
  {
    id: 2,
    name: "Converse Shoes",
    description: "Chuck Taylor All Star Trek - Chuck 70 Platform Shoes Ecru US 9aI",
    price: "540,000 ",
    image: shoes,
  },
  {
    id: 3,
    name: "Essential Hoodie",
    description: "Buttercream Essential Hoodie",
    price: "370,000 ",
    image: hoodie,
  },
  {
    id: 4,
    name: "Veleno Perfume",
    description: "Veleno Perfume, 100ml",
    price: "28,000 ",
    image: perfume,
  },
];

const FeatureProduct = () => {
  return (
    <div>
      <section className="ml-16 flex flex-col mb-10 md:mb-20 space-y-3 ">
        <div>
          <div className="relative mt-20 md:mt-0  mb-10 w-72 h-11">
            <h2 className="text-[30px] leading-none text-[#A51910] text-left font-bold">
              Feature Products
            </h2>
            <div className="absolute w-[75px] h-0 border-b-[4px] left-1/2 transform -translate-x-1/2 mt-2 border-b-[#A51910]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mr-16 ">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-[27px] flex flex-col transform transition duration-300 hover:scale-105"
            >
              <Link
                to={`/product/${product.id}`}
                className="w-full h-full flex flex-col items-start hover:shadow-xl transition-all"
              >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain rounded-[27px] p-2"
              />
              <div className="mt-4 text-left px-6">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>

              {/* Price and Cart Icon */}
              <div className="mt-4 w-full flex justify-between px-6">
                <p className="text-[#A51910] font-bold text-[20px]">
                  {product.price}
                  <span className="text-black font-bold text-[20px]">MMK</span>
                </p>

                <button className="bg-[#A51910] mb-6 text-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-red-700 transition">
                  +
                </button>
                
              </div>
              </Link>
            </div>

          ))}
        </div>
      </section>
    </div>
  );
};

export default FeatureProduct;
