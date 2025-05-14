import React from 'react'
import Discountbg from "../assets/discount-bg.png"

const Discount = () => {
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      {/* Background Image */}
      <img
        src={Discountbg}
        alt="Discount Offer"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Discount Text */}
      <div className="absolute text-white text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold">Special Discount!</h2>
        <p className="text-lg md:text-xl mt-2">
          Get up to 50% off on selected items. Limited time only!
        </p>

          </div>
    </div>
  )
}

export default Discount;