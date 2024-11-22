import { combineReducers } from "@reduxjs/toolkit";
import { courseSlice } from "./slices/course/courseSlice";
import { authSlice } from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { profileApiSlice } from "./slices/profile/profileApiSlice";
import { checkOutApiSlice } from "./slices/payment/checkoutApiSlice";
import { checkVoucherApiSlice } from "./slices/voucher/checkVoucherApiSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  [courseSlice.reducerPath]: courseSlice.reducer,
  [checkVoucherApiSlice.reducerPath]: checkVoucherApiSlice.reducer,
  [checkOutApiSlice.reducerPath]: checkOutApiSlice.reducer,
});

export default rootReducer;
