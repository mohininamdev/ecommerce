// features/adminOrders/adminOrderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "adminOrder/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/admin/get-all-orders`,

        { withCredentials: true }
      );
      return data.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// export const changeOrderStatus = createAsyncThunk(
//   "adminOrders/changeOrderStatus",
//   async ( _id, thunkAPI) => {
//     try {
//       const { data } = await axios.put(
//         `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/admin/order/${_id}`,
//         {}, // assuming backend expects this format
//         { withCredentials: true }
//       );
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );

export const changeOrderStatus = createAsyncThunk(
  "adminOrders/changeOrderStatus",
  async ({ _id, orderStatus }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/admin/order/${_id}`,
        { orderStatus },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "adminOrder/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/delete/${id}`,
        { withCredentials: true }
      );
      return { id, message: data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    message: null,
    success: false,
    statusChanged: false,
  },
  reducers: {
    clearAdminOrderMessages: (state) => {
      state.error = null;
      state.message = null;
    },
    clearOrderStatusState: (state) => {
      state.success = false;
      state.message = "";
      state.error = null;
      state.statusChanged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Order Status change
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const { _id, orderStatus } = action.payload;

        // Find the order in the state and update its status
        const orderToUpdate = state.orders.find((order) => order._id === _id);
        if (orderToUpdate) {
          orderToUpdate.orderStatus = orderStatus;
        }

        state.statusChanged = true;
        state.message = "Order status updated";
        // state.loading = false;
        // state.success = true;
        // state.statusChanged = true;
        // state.message = action.payload;
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

export const { clearAdminOrderMessages, clearOrderStatusState } =
  adminOrderSlice.actions;
export default adminOrderSlice.reducer;
