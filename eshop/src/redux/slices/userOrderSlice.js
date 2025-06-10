// features/userOrders/userOrderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = { withCredentials: true };

// --- Async Thunks ---
export const createOrder = createAsyncThunk(
  "userOrder/create",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/create`,
        orderData,
        config
      );
      return data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "userOrder/getMy",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/my-orders`,
        config
      );
      return data.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "Failed to load orders"
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "userOrder/cancel",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/cancel/${id}`,
        {},
        config
      );
      return { id, message: data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);



// --- Slice ---
const userOrderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearUserOrderMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.message = action.payload.message;
      });

      
  },
});

export const { clearUserOrderMessages } = userOrderSlice.actions;
export default userOrderSlice.reducer;
