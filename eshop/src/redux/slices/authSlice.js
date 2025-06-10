import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial guest ID (for non-auth users like cart tracking)
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
  user: null,
  guestId: initialGuestId,
  loading: false,
  error: null,
  message: null,
};

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`,
        userData,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/register`,
        userData,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Load user from cookie session (/me endpoint)
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const {data} = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/profile`,
        { withCredentials: true }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load user");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/updateProfile`,
        updatedData,
        { withCredentials: true }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "auth/updateProfilePicture",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // field name matches multer single("file")

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/update-picture`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data.message; // Or return full data if you want to use image URL in UI
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile picture update failed"
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/updatePassword`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password update failed"
      );
    }
  }
);




// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      // Load User
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload?.message || "Not authenticated";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("User logged out in reducer");
        state.user = null;
        state.error = null;
        state.message = "Successfully logged out";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Logout failed";
      })

      //Profile Picture Update 
      .addCase(updateProfilePicture.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProfilePicture.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload; // success message
    })
    .addCase(updateProfilePicture.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
          // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
