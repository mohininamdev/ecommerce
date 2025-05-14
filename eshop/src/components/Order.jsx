import React, { useState } from "react";
import Footer from "./Footer";
import profileside from "../assets/profile-side.png";
import orderside from "../assets/orderside.png";
import Search from "../assets/search.png";
import { Link } from "react-router-dom";

export default function Order() {
  const [activeTab, setActiveTab] = useState("ORDER");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    {
      no:1,
      id: "1234567890",
      date: "16 / 6 / 2023",
      updated: "updated 23 Hr ago",
      status: "ORDERED",
    },
    {
      no:2,
      id: "9999999990",
      date: "14 / 6 / 2023",
      updated: "updated 3 days ago",
      status: "ORDERED",
    },
    {
      no:3,
      id: "87634567890",
      date: "16 / 6 / 2023",
      updated: "updated 23 Hr ago",
      status: "ORDERED",
    },
    {
      no:4,
      id: "5699999990",
      date: "14 / 6 / 2023",
      updated: "updated 3 days ago",
      status: "ORDERED",
    }
  ];

  const filteredOrders = orders.filter(order =>
    order.id.startsWith(searchQuery)
  );

  return (
    <div className="flex flex-col mt-14 relative">
      <div className="flex md:flex-row flex-col items-start">
        {/* Sidebar */}
        <div className="md:flex flex-col w-24">
          <div
            className={`py-4 text-sm pl-2 rounded-tr-[27px] rounded-br-[27px] shadow-lg cursor-pointer hover:bg-red-600 text-white ${
              activeTab === "ORDER" ? "bg-red-900" : "bg-red-800"
            }`}
            onClick={() => setActiveTab("ORDER")}
          >
            ORDER
          </div>
          <div
            className={`mb-8 py-4 text-sm pl-2 rounded-tr-[27px] rounded-br-[27px] shadow-lg cursor-pointer hover:bg-red-600 text-white ${
              activeTab === "PROFILE" ? "bg-red-900" : "bg-red-800"
            }`}
            onClick={() => setActiveTab("PROFILE")}
          >
            PROFILE
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="w-full">
          {activeTab === "PROFILE" && (
            <div className="flex justify-center flex-col md:flex-row">
              <div className="px-4">
                <h2 className="text-2xl font-bold">PROFILE</h2>
                <div className="w-14 h-1 bg-red-800 mb-6"></div>
                <form className="space-y-6 max-w-sm">
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">Ph No.</label>
                    <input
                      type="text"
                      value="09450756980"
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none text-red-800 font-bold"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="w-24 font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-start space-x-4">
                    <label className="w-24 font-medium pt-2">Address</label>
                    <textarea
                      placeholder="Address"
                      className="flex-1 py-2 px-4 rounded-xl shadow bg-gray-100 focus:outline-none h-20"
                    ></textarea>
                  </div>
                  <div className="flex flex-col items-center space-y-4 mt-4">
                    <button className="bg-red-800 text-white py-2 px-6 rounded-full">Save Profile</button>
                    <button className="border border-red-800 text-red-700 py-2 px-6 rounded-full">
                      log Out
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-6 md:mt-4 md:ml-60 px-4">
                <img src={profileside} alt="User" className="w-full object-cover" />
              </div>
            </div>
          )}

          {activeTab === "ORDER" && (
            <div className="flex flex-col md:flex-row">
              <div className="md:ml-20 flex-1 px-4">
                <div className="flex items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">ORDER</h2>
                    <div className="w-14 h-1 bg-red-800 mb-6"></div>
                  </div>
                  <button className="ml-[200px] md:ml-[530px] items-end text-red-800 border border-red-800 bg-white px-4 py-1 rounded-full shadow hover:bg-red-100">
                    DELETE ALL
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex mb-6 gap-4 relative">
                    <input
                      type="text"
                      placeholder="Order ID"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-[250px] md:py-2 pl-10 md:pl-12 rounded-full border border-gray-300 bg-[#EFEFEF] shadow-md outline-none focus:ring-2 focus:ring-slate-200"
                    />
                    <span className="absolute left-3 top-5 md:top-2.5 text-[#6D6D6D]">
                      <img src={Search} alt="Search" className="w-5 h-5" />
                    </span>
                    <button
                      className="bg-red-800 text-white px-5 py-2 rounded-full shadow hover:bg-red-900"
                      onClick={(e) => {
                      e.preventDefault();
                      setSearchQuery(searchTerm);
                      }}
                    >
                      SEARCH
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full shadow hover:bg-gray-400 ml-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchTerm("");
                        setSearchQuery("");
                      }}
                    >
                      Show All
                    </button>
                  </div>
                  <div>
                  <p className="mb-4 text-sm text-gray-600">
                    Total {filteredOrders.length} order(s)
                    </p>
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-full text-base">
                      <thead>
                        <tr className="text-left border-b border-red-800 text-sm text-gray-600">
                          <th className="px-6 py-4 w-24 ">No.</th>
                          <th className="px-6 py-4 w-44">Order ID</th>
                          <th className="px-6 py-4 w-40">Status</th>
                          <th className="px-6 py-4 w-44">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order, index) => (
                          <tr
                            key={order.id}
                            className="border-b border-red-800 text-sm text-gray-800"
                          >
                            <td className="py-4 px-6">{index + 1}</td>
                            <td className="py-4 px-6">{order.id}</td>
                            <td className="py-4 px-6">
                              <Link to="/orderStatus">
                                <span className="bg-red-800 text-white px-4 py-1 rounded-full text-xs font-medium">
                                  {order.status}
                                </span>
                              </Link>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-col">
                                <Link to="/paymentDetail">
                                  <p>{order.date}</p>
                                  <p className="text-xs text-gray-400">{order.updated}</p>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {searchQuery && filteredOrders.length === 0 && (
                      <p className="text-center text-gray-500 mt-6">No orders found.</p>
                    )}
                  </div>               
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-11 md:mr-16">
                <img src={orderside} alt="User" className="w-full max-w-xs mx-auto md:w-auto object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center space-y-6 md:space-y-8">
        <Footer />
      </div>
    </div>
  );
}
