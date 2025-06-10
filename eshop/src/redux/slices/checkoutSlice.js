// src/redux/slices/checkoutSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Stripe payment intent request
export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async (totalAmount, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/payments`,
        {
          totalAmount,
    description: "Order payment for E-SHOP",
    customerName: "John Doe",
    customerAddress: {
      line1: "123 Main Street",
      city: "Mumbai",
      state: "MH",
      postal_code: "400001",
      country: "IN",
    },
        },
        { withCredentials: true }
      );
      return data.client_secret;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Payment failed");
    }
  }
);

// Thunk to place order
export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/create`, // backend endpoint
        orderData,
       { headers: {
            "Content-Type": "application/json", // ✅ correct for JSON
          },
         withCredentials: true 
      }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place order"
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    loading: false,
    client_secret: '',
    success:false,
    orderSuccess: false,
     message: null,
    items: [],
    totalAmount: 0,
    error: '',
    shippingInfo: {
      address: '',
      city: '',
      country: '',
    },
    paymentMethod: 'COD',  // default value
  },
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    resetCheckoutState: (state) => {
      state.orderSuccess = false;
      state.error = '';
      state.shippingInfo = { address: '', city: '', country: '' };
      state.paymentMethod = 'COD';
      state.loading = false;
      state.message = null;
    },
    clearClientSecret: (state) => {
      state.client_secret = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
         state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.client_secret = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderSuccess = true;
         state.message = action.payload.message;
        // state.latestOrder = action.payload.order;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setShippingInfo, setPaymentMethod, resetCheckoutState, clearClientSecret } = checkoutSlice.actions;
export default checkoutSlice.reducer;
