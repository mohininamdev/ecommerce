import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ======= Thunks ======= //

// 1. Fetch all categories
export const fetchCategories = createAsyncThunk(
  "adminCategories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/cat/get-all`,
        { withCredentials: true }
      );
      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Create a new category
export const createCategory = createAsyncThunk(
  "adminCategories/createCategory",
  async (category, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/cat/create`,
        { category },
        { withCredentials: true }
      );
      // return response.data;
      return response.data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Update a category
export const updateCategory = createAsyncThunk(
  "adminCategories/updateCategory",
  async ({ id, updatedCategory }, thunkAPI) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/cat/update/${id}`,
        { category: updatedCategory },
        { withCredentials: true }
      );
      return { id, updatedCategory };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. Delete a category
export const deleteCategory = createAsyncThunk(
  "adminCategories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/cat/delete/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ======= Slice ======= //

const adminCategorySlice = createSlice({
  name: "adminCategories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetCategoryStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.successMessage = "Category created successfully!";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updatedCategory } = action.payload;
        const index = state.categories.findIndex((cat) => cat._id === id);
        if (index !== -1) {
          state.categories[index].category = updatedCategory;
        }
        state.successMessage = "Category updated successfully!";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
        state.successMessage = "Category deleted successfully!";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetCategoryStatus } = adminCategorySlice.actions;
export default adminCategorySlice.reducer;
