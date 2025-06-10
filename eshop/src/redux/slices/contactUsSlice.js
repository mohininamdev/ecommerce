// src/redux/contactUsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async thunk to send contact message
export const submitContactForm = createAsyncThunk(
  "contactUs/submitContactForm",
  async (formData, thunkAPI) => {
    try {
       const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/contactUs/user/form`, 
        formData,
      { withCredentials: true }
    );
      return data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

export const fetchAllMessages = createAsyncThunk(
  "contactUs/fetchAll",
  async (_, thunkAPI) => {
    try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/contactUs/admin/formData`,
      { withCredentials: true }
    );
    return data.messages;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }

  }
);

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: {
    loading: false,
    success: false,
    error: null,
    messages: [],
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to submit contact message";
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { resetContactState } = contactUsSlice.actions;
export default contactUsSlice.reducer;
