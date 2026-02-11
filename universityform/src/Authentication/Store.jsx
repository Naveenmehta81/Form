import { configureStore } from "@reduxjs/toolkit";
import  authSlice from  "./authdataSlice"

const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default Store 
