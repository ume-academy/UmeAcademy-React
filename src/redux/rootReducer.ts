import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/auth/authApiSlice";
import { authSlice } from "./slices/auth/authSlice";
import { categoryApiSlice } from "./slices/category/categoryApiSlice";
import { commissionRateApiSlice } from "./slices/commission_rate/commissionRateApiSlice";
import { courseApiSlice } from "./slices/course/courseApiSlice";
import { searchCourseApiSlice } from "./slices/course/searchCourseApiSlice";
import { lessonApiSlice } from "./slices/lesson/lessonApiSlice";
import { paymentMethodApiSlice } from './slices/payment_method/paymentMethodApiSlice';
import { profileApiSlice } from "./slices/profile/profileApiSlice";
import { checkTeacherApiSlice } from "./slices/teacher/checkIsTeacher/checkTeacherApiSlice";
import { registerTeacherApiSlice } from "./slices/teacher/register/registerTeacherApiSlice";
import { revenueApiSlice } from "./slices/teacher/revenue/revenueApiSlice";
import { studentApiSlice } from "./slices/teacher/student/studentApiSlice";
import { walletApiSlice } from "./slices/teacher/wallet/walletApiSlice";
import { userSlice } from "./slices/user/userSlice";
import { transactionApiSlice } from "./slices/transaction/transactionApiSlice";
import { levelApiSlice } from "./slices/level/levelApiSlice";
import { withdrawApiSlice } from "./slices/teacher/withdraw/withdrawApiSlice";
import { roleApiSlice } from "./slices/role/roleApiSlice";
import { refundApiSlice } from "./slices/transaction/refundApiSlice";
import { targetApiSlice } from "./slices/target/targetApiSlice";
import { profileTeacherApiSlice } from "./slices/teacher/profile/profileTeacherApiSlice";
import { voucherApiSlice } from "./slices/voucher/voucherApiSlice";
import { chapterApiSlice } from "./slices/chapter/chapterApiSlice";
import { checkAdminApiSlice } from "./slices/admin/checkAdminApiSlice";
import { transactionHistoryApiSlice } from "./slices/transaction_history/transactionHistoryApiSlice";
import { walletHistoryApiSlice } from "./slices/student/walletHistoryApiSlice";
import { requestApprovalCourseApiSlice } from "./slices/teacher/requestApprovalCourse/requestApprovalCourseApiSlice";
import { reviewCourseApiSlice } from "./slices/course/reviewCourseApiSlice";
import { blogApiSlice } from "./slices/blog/blogApiSlice";


const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [profileApiSlice.reducerPath]: profileApiSlice.reducer,
  [courseApiSlice.reducerPath]: courseApiSlice.reducer,
  [voucherApiSlice.reducerPath]: voucherApiSlice.reducer,
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
  [registerTeacherApiSlice.reducerPath]: registerTeacherApiSlice.reducer,
  [studentApiSlice.reducerPath]: studentApiSlice.reducer,
  [transactionApiSlice.reducerPath]: transactionApiSlice.reducer,
  [withdrawApiSlice.reducerPath]: withdrawApiSlice.reducer,
  [refundApiSlice.reducerPath]: refundApiSlice.reducer,
  [roleApiSlice.reducerPath]: roleApiSlice.reducer,
  [targetApiSlice.reducerPath]: targetApiSlice.reducer,
  [profileTeacherApiSlice.reducerPath]: profileTeacherApiSlice.reducer,
  [chapterApiSlice.reducerPath]: chapterApiSlice.reducer,
  [checkAdminApiSlice.reducerPath]: checkAdminApiSlice.reducer,
  [transactionHistoryApiSlice.reducerPath]: transactionHistoryApiSlice.reducer,
  [walletHistoryApiSlice.reducerPath]: walletHistoryApiSlice.reducer,
  [requestApprovalCourseApiSlice.reducerPath]: requestApprovalCourseApiSlice.reducer,
  [reviewCourseApiSlice.reducerPath]: reviewCourseApiSlice.reducer,
  [blogApiSlice.reducerPath]: blogApiSlice.reducer,
})

export default rootReducer
