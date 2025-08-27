import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSubscribe } from "../api/subscriptionAPI";
import { setError, clearError } from "./uiSlice";

export const subscribeUser = createAsyncThunk(
  "subscribe/subscribeUser",
  async (subscriptionData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchSubscribe(subscriptionData);
      if (!response.success) {
        dispatch(setError(response.message || "Subscription failed"));
        return rejectWithValue(response.message);
      }
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Subscription failed."));
      return rejectWithValue(err.message);
    }
  }
);

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    loading: false,
    success: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(subscribeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(subscribeUser.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });
  },
});

export default subscribeSlice.reducer;
