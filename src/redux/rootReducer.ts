import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { authSlice } from "./slices/auth/authSlice";
import { commissionRateApiSlice } from "./slices/commission_rate/commissionRateApiSlice";
import { courseApiSlice } from "./slices/course/courseApiSlice";
import { lessonApiSlice } from "./slices/lesson/lessonApiSlice";
import { checkOutApiSlice } from "./slices/payment/checkOutApiSlice";
import { paymentMethodApiSlice } from './slices/payment_method/paymentMethodApiSlice';
import { profileApiSlice } from "./slices/profile/profileApiSlice";
import { revenueApiSlice } from "./slices/teacher/revenue/revenueApiSlice";
import { walletApiSlice } from "./slices/teacher/wallet/walletApiSlice";
import { userSlice } from "./slices/user/userSlice";
import { checkVoucherApiSlice } from "./slices/voucher/checkVoucherApiSlice";
import { searchCourseApiSlice } from "./slices/course/searchCourseApiSlice";
import { categoryApiSlice } from "./slices/category/categoryApiSlice";
import { levelApiSlice } from "./slices/course/levelApiSlice";
import { checkIsTeacherSlice } from "./slices/teacher/check_teacher/checkTeacherSlice";
import { checkTeacherApiSlice } from "./slices/teacher/check_teacher/checkTeacherApiSlice";


const rootReducer = combineReducers({
  auth: authSlice.reducer,
  isTeacher: checkIsTeacherSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  [checkOutApiSlice.reducerPath]: checkOutApiSlice.reducer,
  [courseApiSlice.reducerPath]: courseApiSlice.reducer,
  [checkVoucherApiSlice.reducerPath]: checkVoucherApiSlice.reducer,
  [lessonApiSlice.reducerPath]: lessonApiSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [paymentMethodApiSlice.reducerPath]: paymentMethodApiSlice.reducer,
  [walletApiSlice.reducerPath]: walletApiSlice.reducer,
  [commissionRateApiSlice.reducerPath]: commissionRateApiSlice.reducer,
  [revenueApiSlice.reducerPath]: revenueApiSlice.reducer,
  [searchCourseApiSlice.reducerPath]: searchCourseApiSlice.reducer,
  [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  [levelApiSlice.reducerPath]: levelApiSlice.reducer,
  [checkTeacherApiSlice.reducerPath]: checkTeacherApiSlice.reducer,

})

export default rootReducer
