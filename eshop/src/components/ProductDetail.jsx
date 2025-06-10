import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import review1 from "../assets/productimg/miniimg/b2.png";
import review2 from "../assets/productimg/miniimg/b3.png";
import review3 from "../assets/productimg/miniimg/b4.png";
import review4 from "../assets/productimg/miniimg/black-bag.png";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchSingleProduct,
} from "../redux/slices/productSlice";
import ProductReview from "./ProductReview";
import { useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const reviewProducts = {
  name: "CHANEL Mini flap bag",
  description: "Stylish.",
  reviewImages: [review1, review2, review3, review4],
};

const ProductDetail = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // const [selectedColor, setSelectedColor] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleAddToCart = () => {
    if (!user || !user._id) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        userId: user._id,
        productId: singleProduct._id,
        productName: singleProduct.name,
        price: singleProduct.price,
        quantity,
      })
    );
    navigate("/cart");
  };

  const [selectedSize, setSelectedSize] = useState("Medium");
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowDropdown(false);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, singleProduct, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!singleProduct) return <p>No product found.</p>;

  // const handleColorSelect = (color) => setSelectedColor(color);
  // const colors = singleProduct.colors;

  return (
    <div className="relative">
      <div className="p-6 md:w-3/5 w-full md:m-14 md:ml-44 md:items-center md:justify-center grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image and Thumbnails */}
        <div>
          <Link to="/product">
            <button
              className="md:hidden mt-4
              mb-4 bg-red-700 text-white px-6 py-2 rounded-tr-full rounded-br-full w-fit"
            >
              BACK
            </button>
          </Link>

          <img
            src={singleProduct.images?.[0]?.url}
            alt={singleProduct.name || "product"}
            className="w-full rounded-xl"
          />

          <div className="mt-7 grid grid-cols-4 md:grid-cols-4 gap-7">
            {reviewProducts.reviewImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Review ${i + 1}`}
                className="w-full h-full object-cover rounded-[27px] shadow hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="text-sm text-gray-500">Home / Bags</div>
          <h1 className="text-2xl font-bold">{singleProduct.name}</h1>
          <div className="text-xl font-semibold text-gray-700">
            {singleProduct.price}
          </div>

          <div className="z-50 relative mt-2 sm:mt-0">
            <button
              className="flex items-center gap-2 px-4 w-36 py-2 border border-[#F4F4F4] rounded-lg text-sm hover:bg-gray-100"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Select Size <ChevronDown className="w-4 h-4" />
            </button>

            {showDropdown && (
              <div className="absolute mt-2 w-48 bg-[#F4F4F4] border border-gray-200 rounded shadow-lg z-10">
                <ul className="text-sm text-gray-700">
                  <li
                    onClick={() => handleSizeSelect("Small")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Small
                  </li>
                  <li
                    onClick={() => handleSizeSelect("Medium")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Medium
                  </li>
                  <li
                    onClick={() => handleSizeSelect("Large")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Large
                  </li>
                </ul>
              </div>
            )}
            <p className="ml-4 mb-4 text-sm text-gray-600">
              Size: {selectedSize}
            </p>
            {/* Color selection */}
            {/* <div className="mb-4">
              <p className="font-semibold mb-2">Color:</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Selected: {selectedColor || "None"} / {selectedSize || "None"}
            </div> */}
          </div>
          <div>
            <h2 className="font-bold">PRODUCT DETAILS</h2>
            <p className="text-gray-600">{singleProduct.description}</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={decreaseQuantity}
              className="border rounded-md p-2 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="border rounded-md p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="text-black text-sm">
            stock: {singleProduct.stock}
          </span>
          <p className="text-sm text-gray-500">Rating: {singleProduct.rating}</p>

          <button
            onClick={handleAddToCart}
            className="flex w-36 items-center justify-center bg-red-700 hover:bg-red-800 text-white py-2 rounded-full shadow"
          >
            Add To Cart
          </button>
        </div>
        <ProductReview productId={singleProduct._id} />
      </div>
      <section className="px-4 md:pl-16 ">
        <div className="relative w-72 h-11 top-8">
          <h2 className=" text-[30px] leading-none text-[#A51910] text-left font-bold">
            Relative Products
          </h2>

          <div className="absolute w-[75px] h-0 border-b-[4px] left-[50px] transform -translate-x-1/2 mt-2 border-b-[#A51910]" />
        </div>
        <div className="my-16 md:my-16 m-4 md:m-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.slice(0, 5).map((product) => (
            <Link key={product.id} to={`/product/${product._id}`}>
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-[27px] flex flex-col transform transition duration-300 hover:scale-105"
              >
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-[27px] "
                />
                <div className="mt-4 text-left pl-3">
                  <h3 className="text-lg font-bold ">{product.name}</h3>
                </div>

                {/* Price and Cart Icon */}
                <div className="mt-4 w-full flex justify-between px-3">
                  <p className="text-[#A51910] font-bold text-[20px] ">
                    {product.price.toLocaleString()} MMK
                  </p>

                  <button className="bg-[#A51910] mb-6 text-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-red-700 transition">
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
