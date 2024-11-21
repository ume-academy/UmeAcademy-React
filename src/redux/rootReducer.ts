import { combineReducers } from "@reduxjs/toolkit";
import { courseSlice } from "./slices/courseSlice";
import { authSlice } from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { profileApiSlice } from "./slices/profile/profileApiSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  [courseSlice.reducerPath]: courseSlice.reducer,
});

export default rootReducer;
