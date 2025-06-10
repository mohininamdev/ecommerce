import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestProducts } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";

const LatestProduct = () => {
  const dispatch = useDispatch();

  // ✅ FIXED: Access latestProducts, not just products
  const { latestProducts = [], loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchLatestProducts());
  }, [dispatch]);

  if (loading) return <p>Loading latest products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <section className="ml-16 flex flex-col mt-10 md:mb-20 space-y-3">
        <div>
          <div className="relative mb-10 w-72 h-11">
            <h2 className="text-[30px] leading-none text-[#A51910] text-left font-bold">
              Latest Products
            </h2>
            <div className="absolute w-[75px] h-0 border-b-[4px] left-1/2 transform -translate-x-1/2 mt-2 border-b-[#A51910]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mr-16">
          {latestProducts.map((product) => (
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
                  <p className="text-sm text-gray-500">
                    Added on:{" "}
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>

                <div className="mt-4 w-full flex justify-between px-6">
                  <p className="text-[#A51910] font-bold text-[20px]">
                    {product.price}{" "}
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

export default LatestProduct;
