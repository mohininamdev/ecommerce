import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/get-all`, {
        withCredentials: true,
      });
      return data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Fetch failed"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/delete/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

export const fetchUserById = createAsyncThunk("admin/fetchUserById",// ✅ 2. Fetch single product by ID

  async (id, { rejectWithValue }) => {
    try{
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/detail/${id}`, {
      withCredentials: true,
    });
    return data.user;
  }catch(error){
    return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
  }
  }
);


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: [],
    singleUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get user by id 
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export default adminSlice.reducer;
