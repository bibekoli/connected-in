import { combineReducers } from "@reduxjs/toolkit";
import * as currentUserReducers from "@/redux/reducers/currentUserReducer";
import * as customerReducers from "@/redux/reducers/customerReducer";

const allReducers = combineReducers({
  currentUser: currentUserReducers.currentUserReducer,
  customers: customerReducers.customerReducer,
});

export default allReducers;