// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ 1. Fetch all products
export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-all`, {
      withCredentials: true,
    });
    return data.products;
  }
);

// ✅ 2. Fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
  "admin/fetchProductDetails",
  async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`, {
      withCredentials: true,
    });
    return data.product;
  }
);

// ✅ 3. Create new product (with image)
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (formData, { rejectWithValue }) => {
    try{
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/create`, 
      formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return data.product;
  }catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Product creation failed"
      );
    }
  }
);

// ✅ 4. Update product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // important for FormData
            
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

// ✅ 5. Delete product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/delete/${id}`, { withCredentials: true });
    return id;
  }
);

// // ✅ 6. Submit or update a review
// export const submitReview = createAsyncThunk(
//   "admin/submitReview",
//   async (id, reviewData) => {
//     const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}/review`, reviewData, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     return data.message;
//   }
// );
// ✅ Fetch all reviews of a single product (admin)
export const fetchProductReviews = createAsyncThunk(
  "admin/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${productId}/reviews`,
        {
          withCredentials: true,
        }
      );
      // Assuming API returns { reviews: [...] }
      return data.reviews;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// 🔄 Upload Product Image (Admin)
export const uploadProductImage = createAsyncThunk(
  'productImage/upload',
  async ({ productId, imageFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/image/${productId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

// ❌ Delete Product Image (Admin)
export const deleteProductImage = createAsyncThunk(
  'productImage/delete',
  async ({ productId, imageId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/delete-image/${productId}?id=${imageId}`,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

// Slice
const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    productDetails: null,
    productReviews: [],        // <-- reviews for selected product
    reviewsLoading: false,
    reviewsError: null,
    success: false,
    message: "",
    loading: false,
    error: null,
    
  },
  reducers: {
    clearAdminProductState: (state) => {
      state.success = false;
      state.message = "";
      state.error = null;
    },
    resetProductImageState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch single
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
      })

      // create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = "Product created successfully";
      })

      // update
      .addCase(updateProduct.fulfilled, (state) => {
        state.success = true;
        state.message = "Product updated successfully";
      })

      // delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.success = true;
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.message = "Product deleted";
      })

      // fetch product reviews (admin)
      .addCase(fetchProductReviews.pending, (state) => {
        state.reviewsLoading = true;
        state.reviewsError = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.reviewsLoading = false;
        state.productReviews = action.payload;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.reviewsLoading = false;
        state.reviewsError = action.payload;
      })

      // // review
      // .addCase(submitReview.fulfilled, (state, action) => {
      //   state.message = action.payload;
      // })

       // Upload
    .addCase(uploadProductImage.pending, (state) => {
      state.loading = true;
    })
    .addCase(uploadProductImage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    })
    .addCase(uploadProductImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Delete
    .addCase(deleteProductImage.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProductImage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    })
    .addCase(deleteProductImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

      // error fallback
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { clearAdminProductState, resetProductImageState } = adminProductSlice.actions;
export default adminProductSlice.reducer;
