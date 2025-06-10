import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import DeleteIcon from "../assets/delete-icon.png";
import CartIcon from "../assets/cart-icon.png";
import OrderIcon from "../assets/order-icon.png";

import reddlt from "../assets/red-delete-icon.png";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../redux/slices/cartSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, items, totalAmount, status, error } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
   const toastShownRef = useRef(false); 

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    } else if(!toastShownRef.current){
      toast.error("Please login to see your cart...", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      toastShownRef.current = true;
    }
  }, [dispatch, userId, navigate]);

  const handleIncrease = (productId, currentQuantity) => {
    dispatch(
      updateQuantity({ userId, productId, quantity: currentQuantity + 1 })
    );
  };

  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(
        updateQuantity({ userId, productId, quantity: currentQuantity - 1 })
      );
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ userId, productId }));
  };

  const handleClear = () => {
    dispatch(clearCart(userId));
  };

  if (status === "loading")
    return <p className="text-center mt-4">Loading cart...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  if ((!userId || !items.length) && user === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-gray-600 mb-4">
          No items in cart. Please login first.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-[80px]">
      <div className="p-4 md:p-6 lg:p-10 bg-white flex-grow">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 ">
          <div className="w-full lg:w-2/3 space-y-4">
            <div>
              <div className="justify-between">
                <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
              <button
                  onClick={handleClear}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200"
                >
                  Clear Cart
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-red-600 p-3 ">
                    {/* hidden md:grid grid-cols-4 font-semibold text-white bg-red-700  */}
                    <tr className="">
                      <th className="border p-2 text-left">Product</th>
                      <th className="border p-2 text-center">Price (₹)</th>
                      <th className="border p-2 text-center">Quantity</th>
                      <th className="border p-2 text-center">Subtotal (₹)</th>
                      <th className="border p-2 text-center">
                        <div className="ml-[110px]">
                          <img
                            src={DeleteIcon}
                            alt="Delete"
                            className=" w-5 h-5"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(
                      ({ _id, productId, productName, price, quantity }) => (
                        <tr key={_id} className="text-center">
                          <td className="border p-2 text-left">
                            {productName}
                          </td>
                          <td className="border p-2">{price}</td>
                          <td className="border p-2">
                            <div className="flex justify-center items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleDecrease(productId, quantity)
                                }
                                disabled={quantity === 1}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                onClick={() =>
                                  handleIncrease(productId, quantity)
                                }
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="border p-2">{price * quantity}</td>
                          <td className="border p-2">
                            <button
                              onClick={() => handleRemove(productId)}
                              className="text-red-500 hover:underline"
                            >
                              <img
                                src={reddlt}
                                alt="Delete"
                                className=" w-5 h-5"
                              />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Total: ₹{totalAmount}</h3>
                <button
                   onClick={() => navigate("/checkout")}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-full hover:bg-red-800"
                >
                 Proceed to Checkout
                </button>
              </div>
            </div>

            <div className=" lg:w-1/3 border-l border-gray-200 pl-6 font-sans">
              <h2 className="font-bold text-lg mb-4">LET’S BUY</h2>
              <div className="ml-12">
                <Link
                  to="/product"
                  className="flex w-56 items-center justify-center bg-red-700 hover:bg-red-800 text-white  py-2 rounded-full mb-4 shadow"
                >
                  <img
                    src={CartIcon}
                    alt="Cart"
                    className="w-7 h-7 cursor-pointer hover:opacity-80 mr-2 "
                  />
                  GO TO SHOPPING
                </Link>

                <Link
                  to="/order"
                  className="flex w-56 items-center justify-center bg-gray-100 hover:bg-gray-200 text-red-700  py-2 rounded-full shadow"
                >
                  <img
                    src={OrderIcon}
                    alt="Order"
                    className="w-7 h-7 cursor-pointer hover:opacity-80 mr-2 "
                  />
                  MY ORDERS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
