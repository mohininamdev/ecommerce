// components/StripeCheckout.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShippingInfo,
  resetCheckoutState,
  placeOrder,
  createPaymentIntent,
  clearClientSecret,
} from "../redux/slices/checkoutSlice";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPayment = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const rawItems = useSelector((state) => state.cart?.items);
  const items = Array.isArray(rawItems) ? rawItems : [];


  const {
    shippingInfo,
    paymentMethod,
    orderSuccess,
    // totalAmount,
    client_secret,
    loading,
    error,
    success,
  } = useSelector((state) => state.checkout);
  const { userId,  totalAmount, itemPrice,
        shippingCharges } = useSelector((state) => state.cart);

          

  useEffect(() => {
    if (totalAmount) {
      dispatch(createPaymentIntent(totalAmount));
      console.log("Creating payment intent with amount:", totalAmount);
    }

    return () => {
      dispatch(clearClientSecret());
      console.log("Component unmounted, clearing client secret");
      
    };
  }, [dispatch, totalAmount]);
  //  console.log("clientSecret:", client_secret);
  // console.log("stripe:", stripe);
  // console.log("elements:", elements);
  const subtotal = Math.round(totalAmount);
const tax = Math.round(subtotal * 0.18);
const shippingFee = subtotal > 1000 ? 0 : 50;
const total = subtotal + tax + shippingFee;

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting payment...");

    if (!stripe || !elements || !client_secret) {
      console.log("Stripe not ready or clientSecret missing");
    return;
    }
    

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    // console.log("Stripe result:", result);

    if (result.error) {
  alert(result.error.message);
  return;
} else {
  // Payment succeeded!
   const paymentIntent = result.paymentIntent;
  dispatch(placeOrder({
    shippingInfo,
    orderItems: items.map(({ productId, productName, price, quantity }) => ({
        name: productName,
        price,
        quantity,
        product: productId,
      })),
    paymentMethod: "ONLINE",
    paymentInfo: {
      id: paymentIntent.id,
      status: paymentIntent.status,
    },
    itemPrice: subtotal,
    tax: tax,
    shippingCharges: shippingFee,
    totalAmount: total,
  }));

  dispatch(clearCart(userId));
  // dispatch(resetCheckoutState());
  alert("Order placed successfully!");
  navigate("/payment-success");
};
  

    
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Pay ₹{totalAmount}</h2>
      {/* <pre>{JSON.stringify(client_secret, null, 2)}</pre> */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          // onSubmit={handleSubmit}
          disabled={!stripe || !client_secret}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutPayment;
