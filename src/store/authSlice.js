import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchLogout, fetchSignup } from "../api/authAPI";
import { setError, clearError } from "./uiSlice";

const savedToken = localStorage.getItem("jwt_token");
const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchSignup(userData);
      if (!response.success) {
        dispatch(setError(response.message || "Signup failed"));
        return rejectWithValue(response.message);
      }
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Signup failed. Please try again later."));
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchLogin(credentials);
      if (!response.success) {
        dispatch(setError(response.message || "Login failed"));
        return rejectWithValue(response.message);
      }
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Login failed. Please try again later."));
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchLogout();
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Logout failed."));
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: savedToken || null,
    user: savedUser || null,
    isAuthenticated: !!savedToken,
  },
  reducers: {
    setAuthFromStorage: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user");
    },
  },
});

export const { setAuthFromStorage, clearAuth } = authSlice.actions;
export default authSlice.reducer;
