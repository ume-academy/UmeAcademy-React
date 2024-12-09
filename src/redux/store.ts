import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { authApiSlice } from './slices/auth/authApiSlice'
import { commissionRateApiSlice } from './slices/commission_rate/commissionRateApiSlice'
import { courseApiSlice } from './slices/course/courseApiSlice'
import { lessonApiSlice } from './slices/lesson/lessonApiSlice'
import { paymentMethodApiSlice } from './slices/payment_method/paymentMethodApiSlice'
import { profileApiSlice } from './slices/profile/profileApiSlice'
import { revenueApiSlice } from './slices/teacher/revenue/revenueApiSlice'
import { walletApiSlice } from './slices/teacher/wallet/walletApiSlice'
import { userSlice } from './slices/user/userSlice'
import { voucherApiSlice } from './slices/voucher/voucherApiSlice'
import { searchCourseApiSlice } from './slices/course/searchCourseApiSlice'
import { categoryApiSlice } from './slices/category/categoryApiSlice'
import { levelApiSlice } from './slices/level/levelApiSlice'
import { checkTeacherApiSlice } from './slices/teacher/checkIsTeacher/checkTeacherApiSlice'
import { registerTeacherApiSlice } from './slices/teacher/register/registerTeacherApiSlice'
import { studentApiSlice } from './slices/teacher/student/studentApiSlice'
import { transactionApiSlice } from './slices/transaction/transactionApiSlice'
import { withdrawApiSlice } from './slices/teacher/withdraw/withdrawApiSlice'
import { refundApiSlice } from './slices/transaction/refundApiSlice'
import { roleApiSlice } from './slices/role/roleApiSlice'
import { targetApiSlice } from './slices/target/targetApiSlice'
import { profileTeacherApiSlice } from './slices/teacher/profile/profileTeacherApiSlice'
import { chapterApiSlice } from './slices/chapter/chapterApiSlice'
import { checkAdminApiSlice } from './slices/admin/checkAdminApiSlice'
import { favoriteCourseApiSlice } from './slices/course/favorite/favoriteCourseApiSlice'
import { transactionHistoryApiSlice } from './slices/transaction_history/transactionHistoryApiSlice'
import { walletHistoryApiSlice } from './slices/student/walletHistoryApiSlice'

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
      favoriteCourseApiSlice.middleware,
      transactionHistoryApiSlice.middleware,
      walletHistoryApiSlice.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch