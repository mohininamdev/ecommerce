import React, {useEffect} from "react";
// import ArrowR from "../assets/arrowR.png"
import { Link } from "react-router-dom";
import {FiChevronRight,FiChevronLeft } from "react-icons/fi"


import { useDispatch, useSelector } from "react-redux";
import { fetchFeatureProducts } from "../redux/slices/productSlice";

const FeatureProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
      (state) => state.products
    );

     useEffect(() => {
    dispatch(fetchFeatureProducts());
  }, [dispatch]);

    if (loading) return <p>Loading feature products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


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

        {/* Chevron Buttons */}
        <button
          className="absolute left-0 flex space-x-2 bg-white shadow p-2 rounded-full"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          className="absolute right-0  flex space-x-2 bg-white shadow p-2 rounded-full"

        >
          <FiChevronRight className="text-2xl" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mr-16 ">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-[27px] flex flex-col transform transition duration-300 hover:scale-105"
            >
              <Link
                to={`/product/${product._id}`}
                className="w-full h-full flex flex-col items-start hover:shadow-xl transition-all"
              >
              <img
                src={product.images?.[0]?.url}
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
