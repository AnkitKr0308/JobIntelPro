import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    globalError: null,
  },
  reducers: {
    setError: (state, action) => {
      state.globalError = action.payload;
    },
    clearError: (state) => {
      state.globalError = null;
    },
  },
});

export const { setError, clearError } = uiSlice.actions;
export default uiSlice.reducer;
