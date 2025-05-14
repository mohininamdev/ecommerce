// import { useState } from "react";
import Footer from "./Footer";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../assets/delete-icon.png"
import CartIcon from "../assets/cart-icon.png"
import OrderIcon from "../assets/order-icon.png"

function Checkout() {
  // const [value, setValue] = useState("");

  return (
    <div className=" mt-[100px] relative">
      <div className="flex flex-col lg:flex-row gap-4">
      {/* Cart Table */}
      <div className="md:w-1/2 sm:w-full">
        <div className="ml-0 bg-red-700 text-white grid grid-cols-4  py-3 rounded-r-full font-semibold">
          <span>PRODUCT</span>
          <span className="md:ml-20">QTY</span>
          <span className="md:ml-20">PRICE</span>
          <span className="w-16 h-7 md:ml-20 "> 
          <img src={DeleteIcon} alt="Delete" className="w-7 h-7 cursor-pointer hover:opacity-80 mr-2 " />
          </span>
        </div>
        <div className=" border-b border-red-700 flex justify-center items-center h-40">
          <p className="text-gray-600 font-semibold">No Items in Cart</p>
        </div>
      </div>

      {/* Checkout Sidebar */}
      <div className=" lg:w-1/3 border-l border-gray-200 pl-6 font-sans">
        <h2 className="font-bold text-lg mb-4">LET’S BUY</h2>
        <div className="ml-12">
          
        <Link
          to="/checkoutDelivery"
          className="flex w-56 items-center justify-center bg-red-700 hover:bg-red-800 text-white  py-2 rounded-full mb-4 shadow"
        >
          <img src={CartIcon} alt="Cart" className="w-7 h-7 cursor-pointer hover:opacity-80 mr-2 " />
           GO TO SHOPPING
        </Link>

        <Link
          to="/order"
          className="flex w-56 items-center justify-center bg-gray-100 hover:bg-gray-200 text-red-700  py-2 rounded-full shadow"
        >
          <img src={OrderIcon} alt="Order" className="w-7 h-7 cursor-pointer hover:opacity-80 mr-2 " />  
          MY ORDERS
        </Link>
        </div>

        
      </div>
    </div>
      <div className="absolute mt-[375px] flex flex-col items-center justify-center space-y-6 md:space-y-8 ">
        <Footer/>
      </div>
    </div>

  );
}

export default Checkout;


