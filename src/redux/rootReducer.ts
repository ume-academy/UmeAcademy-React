import { combineReducers } from "@reduxjs/toolkit";
import { courseSlice } from "./slices/course/courseSlice";
import { authSlice } from "./slices/auth/authSlice";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { profileApiSlice } from "./slices/profile/profileApiSlice";
import { checkVoucherApiSlice } from "./slices/voucher/checkVoucherApiSlice";
import { lessonApiSlice } from "./slices/lesson/lessonApiSlice";
import { checkOutApiSlice } from "./slices/payment/checkOutApiSlice";
import { userSlice } from "./slices/user/userSlice";
import { paymentMethodApiSlice } from './slices/payment_method/paymentMethodApiSlice'
import { walletApiSlice } from "./slices/teacher/wallet/walletApiSlice";
import { commissionRateApiSlice } from "./slices/commission_rate/commissionRateApiSlice";
import { revenueApiSlice } from "./slices/teacher/revenue/revenueApiSlice";


const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  [checkOutApiSlice.reducerPath]: checkOutApiSlice.reducer,
  [courseSlice.reducerPath]: courseSlice.reducer,
  [checkVoucherApiSlice.reducerPath]: checkVoucherApiSlice.reducer,
  [lessonApiSlice.reducerPath]: lessonApiSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [paymentMethodApiSlice.reducerPath]: paymentMethodApiSlice.reducer,
  [walletApiSlice.reducerPath]: walletApiSlice.reducer,
  [commissionRateApiSlice.reducerPath]: commissionRateApiSlice.reducer,
  [revenueApiSlice.reducerPath]: revenueApiSlice.reducer
})

export default rootReducer
