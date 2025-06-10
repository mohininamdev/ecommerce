// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// // ✅ 1. Fetch all products
// export const fetchAllProducts = createAsyncThunk(
//   "admin/fetchProducts",
//   async () => {
//     const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-all`, {
//       withCredentials: true,
//     });
//     return data.products;
//   }
// );
// ✅ 1. Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (categoryId = "", { rejectWithValue }) => {
    try {
      const url = categoryId
          ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-all?category=${categoryId}`
          : `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-all`;
      const response = await axios.get(
        url, 
        { withCredentials: true }
      );
      return response.data.products;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (keyword) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-all?keyword=${keyword}`, {
      withCredentials: true,
    });
    return data.products;
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (category) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-all?category=${category}`, {
      withCredentials: true,
    });
    return data.products;
  }
);


// ✅ 2. Fetch single product by ID
export const fetchSingleProduct = createAsyncThunk(
  "admin/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try{
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`, {
      withCredentials: true,
    });
    return data.product;
  }catch(error){
    return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
  }
  }
);

// Thunk to fetch feature products
export const fetchFeatureProducts = createAsyncThunk(
  "featureProducts/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/home/featureProduct`, {
        withCredentials: true,
      });
      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch feature products"
      );
    }
  }
);
//fetchLatestProducts
export const fetchLatestProducts = createAsyncThunk(
  "latestProducts/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/home/latestProduct`, {
        withCredentials: true,
      });
      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch latest products"
      );
    }
  }
);


// ✅ 3. Submit or update a review (user)
export const submitReview = createAsyncThunk(
  "product/submitReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}/review`,
        reviewData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit review"
      );
    }
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

// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    singleProduct: null,
    productDetails: null,
    latestProducts: [],
    success: false,
    message: "",
    loading: false,
    error: null,
    reviewLoading: false,
    reviewSuccess: false,
    reviewError: null,
  },
  reducers: {
    clearProductState: (state) => {
      state.success = false;
      state.message = "";
      state.error = null;
    },
    clearSingleProductState: (state) => {
      state.singleProduct = null;
      state.error = null;
    },
    clearReviewState: (state) => {
      state.reviewLoading = false;
      state.reviewSuccess = false;
      state.reviewError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch single
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // // review
      // .addCase(submitReview.fulfilled, (state, action) => {
      //   state.message = action.payload;
      // })
      // submit review
      .addCase(submitReview.pending, (state) => {
        state.reviewLoading = true;
        state.reviewSuccess = false;
        state.reviewError = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
        state.message = action.payload;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.payload;
      })
        .addCase(fetchFeatureProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatureProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchFeatureProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // for latest produts 
      .addCase(fetchLatestProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.latestProducts = action.payload; // from your controller
      })
      .addCase(fetchLatestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch latest products";
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

export const { clearProductState, clearSingleProductState,  clearReviewState, } = productSlice.actions;
export default productSlice.reducer;
