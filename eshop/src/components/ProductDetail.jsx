import React, { useState }  from "react";
import { Minus, Plus } from "lucide-react";
import bag from "../assets/productimg/black-bag.png";
import shoes from "../assets/productimg/shoes.png";
import perfume from "../assets/productimg/veleno-perfume.png";
import hat from "../assets/productimg/hat.png";
import watch from "../assets/productimg/watch.png";
import hoodie from "../assets/productimg/hoodie.png";
import review1 from "../assets/productimg/miniimg/b2.png";
import review2 from "../assets/productimg/miniimg/b3.png";
import review3 from "../assets/productimg/miniimg/b4.png";
import review4 from "../assets/productimg/miniimg/black-bag.png";

import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

import { useParams } from "react-router-dom";

const reviewProducts = {
  name: "CHANEL Mini flap bag",
  description: "Stylish.",
  reviewImages: [review1, review2, review3, review4]
};


const products = [
  {
    id:1,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."
  },
  {
    id:2,
    name: "Converse Shoes",
    price: 540000,
    image: shoes,
    description: "Shoes Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:3,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
    description: "Hoodie  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:4,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:5,
    name: "hat",
    price: 850000,
    image: hat,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:6,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:7,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:8,
    name: "Converse Shoes",
    price: 540000,
    image: shoes,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:9,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
    description: "Hoodie Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  
  },
  {
    id:10,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
    description: "Veleno Perfume Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:11,
    name: "hat",
    price: 850000,
    image: hat,
    description: "Hat Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:12,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
    description: "Watch Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:13,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:14,
    name: "Converse Shoes",
    price: 540000,
    image: shoes, 
    description: "Converse shoes Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:15,
    name: "Essential Hoodie",
    price: 370000,
    image: hoodie,
    description: "Hoodie Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:16,
    name: "Veleno Perfume",
    price: 28000,
    image: perfume,
    description: "Perfume Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:17,
    name: "hat",
    price: 850000,
    image: hat,
    description: "Hat Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:18,
    name: "Fossil Watch",
    price: 1200000,
    image: watch,
    description: "Watch Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

  },
  {
    id:19,
    name: "CHANEL Mini flap bag",
    price: 9900000,
    image: bag,
    description: "CHANEL Mini flap bag Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, modi."

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

const ProductDetail = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [quantity, setQuantity] = useState(1);

  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const [selectedSize, setSelectedSize] = useState("Medium"); 
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowDropdown(false);
  };

  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
    if (!product) 
      return 
      <div>Customer not found</div>;

  return (
    <div className="relative"> 
       <div className="p-6 md:w-3/5 w-full md:m-14 md:ml-44 md:items-center md:justify-center grid grid-cols-1 md:grid-cols-2 gap-10">
         {/* Product Image and Thumbnails */}
         <div>
          <Link to="/product">
              <button className="md:hidden mt-4
              mb-4 bg-red-700 text-white px-6 py-2 rounded-tr-full rounded-br-full w-fit">BACK</button>
          </Link>
          
          <img
            src={product.image}
            alt={product.name}
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
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-xl font-semibold text-gray-700">{product.price}</div>

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
                      <li onClick={() => handleSizeSelect("Small")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Small</li>
                      <li onClick={() => handleSizeSelect("Medium")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Medium</li>
                      <li onClick={() => handleSizeSelect("Large")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Large</li>
                    </ul>
                  </div>
                )}
                <p className="ml-4 mb-4 text-sm text-gray-600">
                    Size: {selectedSize}
                    </p>
              </div>
          <div>
            <h2 className="font-bold">PRODUCT DETAILS</h2>
            <p className="text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={decreaseQuantity}
              className="border rounded-md p-2 hover:bg-gray-100">
              <Minus size={16} />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={increaseQuantity} 
              className="border rounded-md p-2 hover:bg-gray-100">
              <Plus size={16} />
            </button>
          </div>
          <Link
            to="/checkoutDelivery"
            className="flex w-36 items-center justify-center bg-red-700 hover:bg-red-800 text-white  py-2 rounded-full shadow"
          >  
            Add To Cart
          </Link>
          
        </div>
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
          <Link key={product.id}
          to={`/product/${product.id}`}
          >
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-[27px] flex flex-col transform transition duration-300 hover:scale-105"
          >
            <img
              src={product.image}
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

        <Footer/>
    </div>
  );
};

export default ProductDetail;

