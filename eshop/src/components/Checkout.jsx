import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShippingInfo,
  setPaymentMethod,
  resetCheckoutState,
  placeOrder,
} from "../redux/slices/checkoutSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rawItems = useSelector((state) => state.cart?.items);
  const items = Array.isArray(rawItems) ? rawItems : [];

  const { shippingInfo, orderSuccess, paymentMethod, status, error } = useSelector(
    (state) => state.checkout
  );

  const { userId} = useSelector(
      (state) => state.cart
    );
  

  const [form, setForm] = useState(shippingInfo);

  useEffect(() => {
    setForm(shippingInfo);
  }, [shippingInfo]);

  // Price calculation
  const itemPrice = items.length
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const tax = +(itemPrice * 0.1).toFixed(2);
  const shippingCharges = itemPrice > 100 ? 0 : 10;
  const totalAmount = +(itemPrice + tax + shippingCharges).toFixed(2);

  const handlePlaceOrder = () => {

    dispatch(setShippingInfo(form));
    if (paymentMethod === "COD") {
    const payload = {
      shippingInfo: form,
      orderItems: items.map(({ productId, productName, price, quantity }) => ({
        name: productName,
        price,
        quantity,
        product: productId,
      })),
      paymentMethod,
      paymentInfo: {}, // optional for COD
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    };

    dispatch(placeOrder(payload));
    // dispatch(clearCart(userId));
  }else{
    // Go to stripe-payment route
    navigate("/checkout-payment", {
      state: {
        items,
        shippingInfo: form,
        paymentMethod,
        itemPrice,
        tax,
        shippingCharges,
        totalAmount,
        userId,
      },
    });
  }
  };

   useEffect(() => {
      if (orderSuccess && userId ) {
        alert('Order placed successfully!');
         dispatch(clearCart(userId));
      dispatch(resetCheckoutState());
        
        navigate('/order');
      }
    }, [orderSuccess, userId,  navigate, dispatch]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-2"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          className="border p-2 w-full mb-2"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          className="border p-2 w-full"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
        <button
          className="mt-2 text-sm text-blue-600 underline"
          onClick={() => dispatch(setShippingInfo(form))}
        >
          Save Shipping Info
        </button>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
          className="border p-2 w-full"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {items.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>Item Price</span>
          <span>₹{itemPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Charges</span>
          <span>₹{shippingCharges.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {status === "loading" && (
        <p className="text-blue-600 mb-2">Conti...</p>
      )}
      {status === "failed" && (
        <p className="text-red-600 mb-2">Error: {error}</p>
      )}

      <button
        disabled={status === "loading"}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handlePlaceOrder}
      >
        Continue 
      </button>
    </div>
  );
};

export default CheckoutPage;
