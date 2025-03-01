import allReducers from "@/redux/reducers";
import { configureStore } from "@reduxjs/toolkit";

const reduxStore = configureStore({
  reducer: allReducers,
  devTools: true,
});

export default reduxStore;