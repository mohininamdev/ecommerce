import React, { useState } from "react";
import Footer from "./Footer";

import orderside from "../assets/orderside.png";
import Search from "../assets/search.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slices/userOrderSlice";

export default function Order() {
  // const [activeTab, setActiveTab] = useState("ORDER");
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders = [] } = useSelector((state) => state.order || {});

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) =>
    order._id.startsWith(searchQuery)
  );

  return (
    <div className="flex flex-col mt-14 relative">
      <div className="flex md:flex-row flex-col items-start">
        {/* Sidebar */}
        <div className="md:flex flex-col w-24">
          <div
            className="py-4 text-sm pl-2 rounded-tr-[27px] rounded-br-[27px] shadow-lg cursor-pointer bg-red-700 hover:bg-red-600 text-white "
          
            onClick={() => navigate("/order")}
          >
            ORDER
          </div>
          <div
            className="mb-8 py-4 text-sm pl-2 rounded-tr-[27px] rounded-br-[27px] shadow-lg cursor-pointer bg-red-700 hover:bg-red-600 text-white "
            onClick={() => navigate("/profile")}
          >
            PROFILE
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="w-full">
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
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-[250px] md:py-2 pl-10 md:pl-12 rounded-full border border-gray-300 bg-[#EFEFEF] shadow-md outline-none focus:ring-2 focus:ring-slate-200"
                    />
                    <span className="absolute left-3 top-5 md:top-2.5 text-[#6D6D6D]">
                      <img src={Search} alt="Search" className="w-5 h-5" />
                    </span>
                    <button
                      className="bg-red-800 text-white px-5 py-2 rounded-full shadow hover:bg-red-900"
                      onClick={(e) => {
                        e.preventDefault();
                        // setSearchQuery(searchTerm);
                      }}
                    >
                      SEARCH
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full shadow hover:bg-gray-400 ml-2"
                      onClick={(e) => {
                        e.preventDefault();
                        // setSearchTerm("");
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
                              <td className="py-4 px-6">
                                {order._id}
                                <br />
                                <span className="text-red-600 text-sm font-medium">
                                  {order.orderItems &&
                                    order.orderItems[0]?.name}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <Link to="/orderStatus">
                                  <span className="bg-red-800 text-white px-4 py-1 rounded-full text-xs font-medium">
                                    {order.orderStatus}
                                  </span>
                                </Link>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex flex-col">
                                  <Link to="/paymentDetail">
                                    <p>
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </p>
                                    {/* <p className="text-xs text-gray-400">{order.updated}</p> */}
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {searchQuery && filteredOrders.length === 0 && (
                        <p className="text-center text-gray-500 mt-6">
                          No orders found.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-11 md:mr-16">
                <img
                  src={orderside}
                  alt="User"
                  className="w-full max-w-xs mx-auto md:w-auto object-cover"
                />
              </div>
            </div>
        
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center space-y-6 md:space-y-8">
        <Footer />
      </div>
    </div>
  );
}
