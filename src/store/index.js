import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fetchSlice from "../reducer/fetchSlice";

const rootReducer = combineReducers({
  fetchSlice,
});

const store = configureStore({
  reducer: { rootReducer },
});

export default store;
