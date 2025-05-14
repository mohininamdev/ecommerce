import React from "react"; 
import FeatureProduct from "./FeatureProduct";
import Discount from "./Discount";
import LatestProduct from "./LatestProduct";
import Footer from "./Footer";
import Bg1 from "../assets/bg1.png";
import HappyShopping from "../assets/happy-shopping.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-full flex">
      <div
        className="absolute top-0 h-full flex flex-col md:flex-row items-center justify-center w-full min-h-[600px] bg-cover bg-center px-6 md:px-20"
        style={{ backgroundImage: `url(${Bg1})` }}
      >
        <div className="relative w-full flex flex-col top-10 items-center md:items-start  text-left md:text-left px-4">
          
          <div className="w-full max-w-lg">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 ">
              Shop Smarter, Not Harder!
            </h2>
            <p className="text-gray-600 text-lg md:w-3/4 mb-6">
              Success isn't always about greatness. It's about consistency. Consistent hard work gains success. Greatness will come.
            </p>
            <Link to="/product" className="bg-[#A51910] text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-red-700">
              Explore Now →
            </Link>
          </div>
        </div>
        
        <div className="w-full flex justify-center mb-10">
        <div className="flex bottom-10 mb-14 sm:w-full sm:max-w-xs absolute w-[310px] h-[69px] left[1250px] md:top-[540px] bg-black/30 blur-[3px] rounded-[50%]"></div>
          <img
            src={HappyShopping}
            alt="Happy Shopping"
            className="w-full max-w-sm md:max-w-md mt-8 drop-shadow-lg"
          />
        </div>
      </div>
    
      <div className="absolute mt-[725px] items-center justify-center">
        <FeatureProduct />
        <Discount />
        <LatestProduct />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
