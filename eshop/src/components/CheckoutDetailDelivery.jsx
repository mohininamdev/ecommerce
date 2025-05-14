import { useState } from "react";
import qr from "../assets/qr.png";
import bag from "../assets/productimg/black-bag.png";
import shoes from "../assets/productimg/shoes.png";
import { Link } from "react-router-dom";
import card from "../assets/card-icon.png";
import photo from "../assets/photo-icon.png";

const CheckoutDetailDelivery = () => {
  const [tab, setTab] = useState("payment");

  return (
    <div className="pt-24 pb-20 bg-white px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left Side */}
        <div className="md:w-[900px] w-full">
          <div className="grid grid-cols-4 font-semibold text-white bg-[#6D6D6D] p-3 rounded-tr-full rounded-br-full text-sm">
            <div className="md:px-5 font-bold">PRODUCT</div>
            <div className="md:pl-40 pl-20 text-center font-bold">QTY</div>
            <div className="md:pl-80 pl-24 col-span-2 font-bold">PRICE</div>
          </div>

          <div className="space-y-8 mt-4">
            {/* Product 1 */}
            <div className="flex flex-wrap items-center gap-4">
              <img src={bag} alt="product" className="w-[60px] h-[60px] object-cover" />
              <p className="font-medium flex-1">CHANEL Mini Flap Bag</p>
              <p className="text-sm flex-1">Qty: 1</p>
              <div className="text-sm md:px-10  font-semibold">9,900,000 MMK</div>
            </div>

            {/* Product 2 */}
            <div className="flex flex-wrap items-center gap-4">
              <img src={shoes} alt="product" className="w-[60px] h-[60px] object-cover" />
              <p className="font-medium flex-1">Converse Shoes</p>
              <p className="text-sm flex-1">Qty: 2</p>
              <div className="text-sm md:px-10 font-semibold">540,000 MMK</div>
            </div>

            {/* Discount & Total */}
            <div className="border-t border-b border-[#2D2B2B] py-4 mt-4 text-sm">
              <div className="flex justify-between px-4">
                <span>Discount</span>
                <span>0%</span>
                <span className="md:px-10">0 MMK</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-md px-4">
              <span>Total</span>
              <span className="md:px-10">10,440,000 MMK</span>
            </div>

            {/* Progress Tracker */}
            <div className="relative w-full mx-auto mt-10">
              <div className="absolute top-4 left-[10%] right-[10%] h-1 bg-[#D9D9D9] z-0 mx-4" />
              <div className="flex justify-between items-center relative z-10 px-4">
                {["Received", "Confirmed", "Country", "Delivered"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${i === 0 ? "bg-red-700 text-white" : "bg-[#D9D9D9] text-black"}`}>
                      {i + 1}
                    </div>
                    <p className="text-xs mt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[400px] md:ml-[200px] space-y-6">
          <div className="w-full rounded p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <img src={card} alt="Receipt" className="w-5 h-5" /> CHECK OUT
            </h2>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold text-red-600">Account:</span> 09450756880
              </p>
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-red-600">ID:</span> 1234567890
                <span className="font-semibold text-red-600 ml-auto">Date:</span> 15/6/2023
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-400">PAYMENT PROOF</p>
            <div className="space-y-6">
              <label className="flex mx-auto justify-center items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-full cursor-pointer w-fit">
                <img src={photo} alt="photoicon" className="w-6 h-6" /> SCREENSHOT
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <img src={qr} alt="QR Code" className="shadow-lg w-40 h-40 rounded-3xl mx-auto" />
            </div>
          </div>

          <div className="flex space-x-6 border-b px-4">
            <button
              className={`pb-2 font-medium ${
                tab === "delivery" ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setTab("delivery")}
            >
              Delivery
            </button>
            <button
              className={`pb-2 font-medium ${
                tab === "payment" ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setTab("payment")}
            >
              Payment
            </button>
          </div>

          {/* Delivery Form */}
          {tab === "delivery" && (
            <div className="space-y-6">
              <form className="space-y-6 px-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <label className="w-full sm:w-1/3 font-medium">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full sm:flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <label className="w-full sm:w-1/3 font-medium">Phone No.</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full sm:flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-2">
                  <label className="w-full sm:w-1/3 font-medium pt-2">Address</label>
                  <textarea
                    placeholder="Address"
                    className="w-full sm:flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none h-20"
                  />
                </div>
              </form>
              <div className="flex justify-end px-4">
                <button className="mt-4 bg-red-700 text-white px-6 py-2 rounded-full w-fit">Add</button>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {tab === "payment" && (
            <div className="space-y-6 px-4">
              <div className="space-y-4 mt-4">
                {[
                  { method: "KBZ Banking", account: "9503050214683323" },
                  { method: "KPay", account: "09450756980" },
                  { method: "Wave Money", account: "09450756980" }
                ].map((item, i) => (
                  <label key={i} className="flex items-start space-x-3">
                    <input type="radio" name="payment" className="mt-1" />
                    <div className="text-sm leading-tight">
                      <p>{item.method} ({item.account})</p>
                      <p className="text-gray-500">(Acc Name - Hein Htet Akar Mg)</p>
                    </div>
                  </label>
                ))}
              </div>
              <Link to="/order">
                <button className="mt-4 bg-red-700 text-white px-6 py-2 rounded-full w-fit">BACK</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailDelivery;
