import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import subscribeReducer from "./subscribeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    subscribe: subscribeReducer,
  },
});

export default store;
