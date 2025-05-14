import React, { useState } from "react";
import bag from "../assets/productimg/black-bag.png";
import shoes from "../assets/productimg/shoes.png";
import dlt from "../assets/delete-icon.png";
import card from "../assets/card-icon.png";
import reddlt from "../assets/red-delete-icon.png";
import qr from "../assets/qr.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const CheckoutPayment = () => {
  const [productsState, setProductsState] = useState([
    {
      id: 1,
      name: "CHANEL Mini Flap Bag",
      price: 9900000,
      image: bag,
    },
    {
      id: 2,
      name: "Converse Shoes",
      price: 540000,
      image: shoes,
    },
  ]);

  const [quantities, setQuantities] = useState(
    productsState.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const [tab, setTab] = useState("delivery");

  const handleQtyChange = (id, type) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: type === "inc" ? prev[id] + 1 : Math.max(1, prev[id] - 1),
    }));
  };

  const handleDelete = (id) => {
    setProductsState((prev) => prev.filter((product) => product.id !== id));
  };

  const total = productsState.reduce((sum, p) => sum + p.price * quantities[p.id], 0);

  return (
    <div className="flex flex-col min-h-screen pt-[80px]">
      <div className="p-4 md:p-6 lg:p-10 bg-white flex-grow">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 ">

          <div className="w-full lg:w-2/3 space-y-4">
            <div className=" hidden md:grid grid-cols-4 font-semibold text-white bg-red-700 p-3 rounded-tr-full rounded-br-full">
              <div>PRODUCT</div>
              <div className="text-center">QTY</div>
              <div className="text-right">PRICE</div>
              <div className="ml-[110px]">
                <img src={dlt} alt="Delete" className=" w-5 h-5" />
              </div>
            </div>

            {productsState.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4 p-4 rounded shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="font-medium text-left">{product.name}</span>
                </div>
                <div className="flex justify-start sm:justify-center items-center gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleQtyChange(product.id, "dec")}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{quantities[product.id]}</span>
                  <button
                    onClick={() => handleQtyChange(product.id, "inc")}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <div className="text-left sm:text-right font-semibold">
                  {product.price.toLocaleString()} MMK
                </div>
                <div className="flex justify-start sm:justify-center">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <img src={reddlt} alt="Delete" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mt-4 text-sm">
              
              <div className="flex mb-2 space-x-4">
                <span className="md:pl-4">Discount</span>
                <span className="md:pl-80">0% </span>
                <span className="md:pl-52">0 MMK</span>
              </div>
              <div className="flex font-semibold space-x-40 text-lg">
                <span className="md:pl-4">Total</span>
                <span className="md:pl-[340px]">{total.toLocaleString()} MMK</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 rounded p-6 shadow-sm space-y-4 border border-gray-200">
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

            {/* Tabs */}
            <div className="flex gap-4 mt-4 border-b">
              <button
                onClick={() => setTab("delivery")}
                className={`pb-1 font-medium ${tab === "delivery" ? "border-b-2 border-red-600 text-black" : "text-gray-400"}`}
              >
                Delivery
              </button>
              <button
                onClick={() => setTab("payment")}
                className={`pb-1 font-medium ${tab === "payment" ? "border-b-2 border-red-600 text-black" : "text-gray-400"}`}
              >
                Payment
              </button>
            </div>

            {tab === "delivery" ? (
              <form className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <label className="w-24 font-medium">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full sm:flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <label className="w-24 font-medium">Ph No.</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full sm:flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-2">
                  <label className="w-24 font-medium pt-2">Address</label>
                  <textarea
                    placeholder="Address"
                    className="w-full sm:flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none h-20"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setTab("payment")}
                    className="bg-red-700 text-white py-2 px-6 rounded-full w-full sm:w-64"
                  >
                    Continue To Payment
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-sm space-y-4">
                <label className="flex items-start gap-2">
                  <input type="radio" name="paymentMethod" defaultChecked />
                  <div>
                    <p>KBZ Banking</p>
                    <p className="text-red-600 text-xs">
                      (960361024583823 - Hein Htet Aung Mg)
                    </p>
                  </div>
                </label>
                <label className="flex items-start gap-2">
                  <input type="radio" name="paymentMethod" />
                  <div>
                    <p>Kpay</p>
                    <p className="text-red-600 text-xs">
                      (09450756880 - Hein Htet Aung Mg)
                    </p>
                  </div>
                </label>

                <div className="flex justify-center">
                  <img src={qr} alt="QR Code" className="w-44 h-44" />
                </div>

                <label className="flex items-start gap-2">
                  <input type="radio" name="paymentMethod" />
                  <div>
                    <p>Wave Money</p>
                    <p className="text-red-600 text-xs">
                      (09450756880 - Hein Htet Aung Mg)
                    </p>
                  </div>
                </label>

                <p className="text-amber-500 font-semibold text-xs mt-4">
                  *Payment Proof is required
                </p>
                <input
                  type="text"
                  placeholder="# Payment ID"
                  className="w-full py-2 px-4 rounded-full shadow bg-gray-100 focus:outline-none"
                />
                <div className="text-center text-gray-500">OR</div>
                <label className="w-full flex justify-center items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-full cursor-pointer">
                  <span>📷</span> SCREENSHOT
                  <input type="file" accept="image/*" className="hidden" />
                </label>

                <Link to="/orderNow">
                  <button className="w-full bg-red-700 text-white py-2 rounded-full text-lg font-semibold mt-4">
                    ORDER NOW
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPayment;
