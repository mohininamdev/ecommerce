import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { fetchCategories } from "../redux/slices/adminCategorySlice";

const Product = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // new
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const productsPerPage = 12;
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { products, loading, message, error } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.adminCategories);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const uniqueCategories = Array.from(
    new Map(categories.map((cat) => [cat.category, cat])).values()
  );

  return (
    <div>
      <div className="min-h-screen overflow-x-hidden bg-white">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="md:fixed w-36 md:mt-14 mt-12 lg:w-36 h-auto lg:h-[420px] sm:mt-10 bg-[#F4F4F4] shadow-[9px_5px_9px_rgba(0,0,0,0.25)] rounded-tr-[86px] rounded-br-[86px] p-6">
            <h2 className="font-semibold text-lg mb-1">Categories</h2>
            <div className="w-[50px] h-[2px] bg-[#A51910] mb-4"></div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li
                className={`pb-3 cursor-pointer hover:text-[#A51910] ${
                  selectedCategoryId === ""
                    ? "text-[#A51910] font-semibold"
                    : ""
                }`}
                onClick={() => {
                  setSelectedCategoryId("");
                  setSelectedCategoryName("");
                  setCurrentPage(1);
                  dispatch(fetchAllProducts()); // fetch all products
                }}
              >
                All Categories
              </li>

              {uniqueCategories.map((category) => (
                <li
                  key={category._id}
                  className={`pb-3 cursor-pointer hover:text-[#A51910] ${
                    selectedCategoryId === category._id
                      ? "text-[#A51910] font-semibold"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(category._id);
                    setSelectedCategoryName(category.category);
                    setCurrentPage(1);
                    dispatch(fetchAllProducts(category._id)); // fetch by category ID
                  }}
                >
                  {category.category}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Listing */}
          <main className="flex-1  sm:p-6 md:ml-44 m-9">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 relative">
              <div className="w-full">
                <h1 className="text-3xl font-bold pb-2 mb-2">
                  {selectedCategoryName || "All Products"}
                </h1>
                <div className="w-[50px] ml-12 h-[2px] bg-[#A51910] mb-4"></div>
              </div>
              {loading && <p className="text-blue-600 mb-4">Loading...</p>}
              {message && <p className="text-green-600 mb-4">{message}</p>}
              {error && <p className="text-red-600 mb-4">{error}</p>}
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
                      {/* <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSortOrder("high");
                          setShowDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        Popularity
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg w-full max-w-full h-full mx-auto rounded-[27px] border border-gray-200"
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="w-full h-full flex flex-col items-start hover:shadow-xl transition-all"
                  >
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-cover mb-4 self-center rounded-[27px]"
                    />
                    <h3 className="text-sm font-medium mb-1 pl-4">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between w-full pl-4 pb-4">
                      <div className="flex items-center gap-1">
                        <p className="text-red-600 text-sm">
                          {product.price.toLocaleString()}
                        </p>
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
