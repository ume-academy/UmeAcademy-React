import { combineReducers } from "@reduxjs/toolkit";
import { courseSlice } from "./slices/courseSlice";
import { authApiSlice } from "./slices/authApiSlice";
import { profileApiSlice } from "./slices/profile/profileApiSlice";

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  [courseSlice.reducerPath]: courseSlice.reducer,
});

export default rootReducer;
