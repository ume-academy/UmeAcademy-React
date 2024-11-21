import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "./slice/authApiSlice";
import { profileApiSlice } from "./slice/profile/profileApiSlice";

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
});

export default rootReducer;
