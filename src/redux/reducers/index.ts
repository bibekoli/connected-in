import { combineReducers } from "@reduxjs/toolkit";
import * as currentUserReducers from "@/redux/reducers/currentUserReducer";
import * as customerReducers from "@/redux/reducers/customerReducer";
import * as chartDataReducers from "@/redux/reducers/chartDataReducer";

const allReducers = combineReducers({
  currentUser: currentUserReducers.currentUserReducer,
  customers: customerReducers.customerReducer,
  chartData: chartDataReducers.chartDataReducer,
});

export default allReducers;