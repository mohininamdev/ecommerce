import React from "react";
import Footer from "./Footer";
import HappyShopping from "../assets/happy-shopping.png";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div className="w-full">
      
        <section className="w-full py-12 px-6 md:px-16 grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl text-[#A51910] font-bold mb-4">About ESHOP</h1>
            <p className="text-base md:text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nostrum dignissimos quod culpa veritatis aspernatur perferendis debitis. Nesciunt, cum voluptates enim eos commodi unde fugit.
            </p>
            <p className="pt-10 md:pt-20">
              <Link
                to="/product"
                className="bg-[#A51910] text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-red-700"
              >
                Explore Now →
              </Link>
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img src={HappyShopping} alt="Happy Shopping" className="h-auto max-w-full" />
          </div>
        </section>
      

      <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
        <Footer />
      </div>
    </div>
  );
};

export default About;
