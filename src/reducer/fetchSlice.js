import { createSlice } from "@reduxjs/toolkit";
import { isRepeat } from "../utils";

const fetchSlice = createSlice({
  name: "fetchSlice",
  initialState: {
    productsArr: [],
    searchProductArr: [],
    searchText: "",
    categryVal: "",
    dropdownStatus: false,
    watchListIdArr: [],
    watchlistProdArr: [],
    sortFilterVal: "",
    userObj: {},
  },
  reducers: {
    handleFetch: (state, action) => {
      state.productsArr = action.payload;
    },
    handleSearchFetch: (state, action) => {
      if (action.payload !== undefined) {
        state.searchProductArr = action.payload;
      } else state.searchProductArr = [];
    },
    handleSearchBar: (state, action) => {
      state.searchText = action.payload;
    },
    handleCategry: (state, action) => {
      state.categryVal = action.payload;
    },
    handleDropdownShow: (state, action) => {
      state.dropdownStatus = !state.dropdownStatus;
    },
    handleAddtoWatchlist: (state, action) => {
      if (
        !state.watchListIdArr.filter((item) => item === action.payload).length
      ) {
        state.watchListIdArr = state.watchListIdArr.concat(action.payload);
      }
    },
    handlewWatchListFetch: (state, action) => {
      if (!isRepeat(state.watchlistProdArr, action.payload.imdbID)) {
        state.watchlistProdArr = state.watchlistProdArr.concat(action.payload);
      }
    },
    handleSortFilter: (state, action) => {
      state.sortFilterVal = action.payload;
    },
    handleUserDetail: (state, action) => {
      state.userObj = action.payload;
    },
  },
});

export const {
  handleSearchBar,
  handleSearchFetch,
  handleFetch,
  handleCategry,
  handleDropdownShow,
  handleAddtoWatchlist,
  handlewWatchListFetch,
  handleSortFilter,
  handleUserDetail,
} = fetchSlice.actions;

export default fetchSlice.reducer;
