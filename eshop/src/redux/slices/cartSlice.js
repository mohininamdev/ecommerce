// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api/v1/cart`;

// Fetch cart by userId
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/${userId}`, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add product to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, productName, price }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_BASE}/add`,
        { userId, productId, productName, price },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update quantity of product in cart
export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_BASE}/update`,
        { userId, productId, quantity },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Remove product from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE}/remove`, {
        data: { userId, productId },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Clear entire cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE}/clear/${userId}`, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  cartId: null,
  userId: null,
  items: [],
  totalAmount: 0,
  status: 'idle', // 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState(state) {
      state.cartId = null;
      state.userId = null;
      state.items = [];
      state.totalAmount = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const { _id, userId, items, totalAmount } = action.payload;
        state.cartId = _id;
        state.userId = userId;
        state.items = items;
        state.totalAmount = totalAmount;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const { _id, userId, items, totalAmount } = action.payload;
        state.cartId = _id;
        state.userId = userId;
        state.items = items;
        state.totalAmount = totalAmount;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Update quantity
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { _id, userId, items, totalAmount } = action.payload;
        state.cartId = _id;
        state.userId = userId;
        state.items = items;
        state.totalAmount = totalAmount;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const { _id, userId, items, totalAmount } = action.payload || {};
        if (_id) {
          state.cartId = _id;
          state.userId = userId;
          state.items = items;
          state.totalAmount = totalAmount;
          state.status = 'succeeded';
          state.error = null;
        } else {
          // Cart empty or deleted
          state.cartId = null;
          state.items = [];
          state.totalAmount = 0;
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // Clear cart
      .addCase(clearCart.fulfilled, (state, action) => {
        const cart = action.payload;
        state.cartId = cart?._id || null;
        state.items = cart?.items || [];
        state.totalAmount = cart?.totalAmount || 0;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
