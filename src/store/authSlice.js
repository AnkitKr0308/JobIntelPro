import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchLogout, fetchSignup } from "../api/authAPI";

const savedToken = localStorage.getItem("jwt_token");
const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData) => {
    const response = await fetchSignup(userData);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await fetchLogin(credentials);
    return response;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await fetchLogout();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: savedToken || null,
    user: savedUser || null,
    isAuthenticated: !!savedToken,
    error: null,
  },
  reducers: {
    setAuthFromStorage: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = {
            id: action.payload.data.userId,
            name: action.payload.data.name,
            role: action.payload.data.role,
          };
          state.isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify(state.user));
        } else {
          state.error = action.payload.message || "Signup failed";
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = action.payload.data;
          state.token = localStorage.getItem("jwt_token");
          state.isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify(state.user));
        } else {
          state.error = action.payload.message || "Login failed";
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem("jwt_token");
          localStorage.removeItem("user");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user");
    });
  },
});

export const { setAuthFromStorage, clearAuth } = authSlice.actions;
export default authSlice.reducer;
