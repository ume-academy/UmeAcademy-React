import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { checkAdminApiSlice } from './slices/admin/checkAdminApiSlice'
import { authApiSlice } from './slices/auth/authApiSlice'
import { categoryApiSlice } from './slices/category/categoryApiSlice'
import { commissionRateApiSlice } from './slices/commission_rate/commissionRateApiSlice'
import { courseApiSlice } from './slices/course/courseApiSlice'
import { searchCourseApiSlice } from './slices/course/searchCourseApiSlice'
import { lessonApiSlice } from './slices/lesson/lessonApiSlice'
import { levelApiSlice } from './slices/level/levelApiSlice'
import { paymentMethodApiSlice } from './slices/payment_method/paymentMethodApiSlice'
import { profileApiSlice } from './slices/profile/profileApiSlice'
import { roleApiSlice } from './slices/role/roleApiSlice'
import { walletHistoryApiSlice } from './slices/student/walletHistoryApiSlice'
import { targetApiSlice } from './slices/target/targetApiSlice'
import { checkTeacherApiSlice } from './slices/teacher/checkIsTeacher/checkTeacherApiSlice'
import { profileTeacherApiSlice } from './slices/teacher/profile/profileTeacherApiSlice'
import { registerTeacherApiSlice } from './slices/teacher/register/registerTeacherApiSlice'
import { revenueApiSlice } from './slices/teacher/revenue/revenueApiSlice'
import { studentApiSlice } from './slices/teacher/student/studentApiSlice'
import { walletApiSlice } from './slices/teacher/wallet/walletApiSlice'
import { withdrawApiSlice } from './slices/teacher/withdraw/withdrawApiSlice'
import { refundApiSlice } from './slices/transaction/refundApiSlice'
import { chapterApiSlice } from './slices/chapter/chapterApiSlice'
import { transactionApiSlice } from './slices/transaction/transactionApiSlice'
import { transactionHistoryApiSlice } from './slices/transaction_history/transactionHistoryApiSlice'
import { userSlice } from './slices/user/userSlice'
import { voucherApiSlice } from './slices/voucher/voucherApiSlice'
import { requestApprovalCourseApiSlice } from './slices/teacher/requestApprovalCourse/requestApprovalCourseApiSlice'
import { reviewCourseApiSlice } from './slices/course/reviewCourseApiSlice'
import { blogApiSlice } from './slices/blog/blogApiSlice'
import { dashboardApiSlice } from './slices/admin/dashboardApiSlice'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      profileApiSlice.middleware,
      courseApiSlice.middleware,
      lessonApiSlice.middleware,
      voucherApiSlice.middleware,
      userSlice.middleware,
      paymentMethodApiSlice.middleware,
      walletApiSlice.middleware,
      commissionRateApiSlice.middleware,
      revenueApiSlice.middleware,
      searchCourseApiSlice.middleware,
      categoryApiSlice.middleware,
      levelApiSlice.middleware,
      checkTeacherApiSlice.middleware,
      registerTeacherApiSlice.middleware,
      studentApiSlice.middleware,
      transactionApiSlice.middleware,
      withdrawApiSlice.middleware,
      refundApiSlice.middleware,
      roleApiSlice.middleware,
      targetApiSlice.middleware,
      profileTeacherApiSlice.middleware,
      chapterApiSlice.middleware,
      checkAdminApiSlice.middleware,
      transactionHistoryApiSlice.middleware,
      walletHistoryApiSlice.middleware,
      requestApprovalCourseApiSlice.middleware,
      reviewCourseApiSlice.middleware,
      blogApiSlice.middleware,
      dashboardApiSlice.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
