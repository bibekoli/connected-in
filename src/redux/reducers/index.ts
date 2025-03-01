import { combineReducers } from "@reduxjs/toolkit";
import * as currentUserReducers from "@/redux/reducers/currentUserReducer";

const allReducers = combineReducers({
  currentUser: currentUserReducers.currentUserReducer,
});

export default allReducers;