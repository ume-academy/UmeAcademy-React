import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { authApiSlice } from './slices/auth/authApiSlice'
import { commissionRateApiSlice } from './slices/commission_rate/commissionRateApiSlice'
import { courseApiSlice } from './slices/course/courseApiSlice'
import { lessonApiSlice } from './slices/lesson/lessonApiSlice'
import { checkOutApiSlice } from './slices/payment/checkOutApiSlice'
import { paymentMethodApiSlice } from './slices/payment_method/paymentMethodApiSlice'
import { profileApiSlice } from './slices/profile/profileApiSlice'
import { revenueApiSlice } from './slices/teacher/revenue/revenueApiSlice'
import { walletApiSlice } from './slices/teacher/wallet/walletApiSlice'
import { userSlice } from './slices/user/userSlice'
import { checkVoucherApiSlice } from './slices/voucher/checkVoucherApiSlice'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      profileApiSlice.middleware,
      courseApiSlice.middleware,
      lessonApiSlice.middleware,
      checkOutApiSlice.middleware,
      checkVoucherApiSlice.middleware,
      userSlice.middleware,
      paymentMethodApiSlice.middleware,
      walletApiSlice.middleware,
      commissionRateApiSlice.middleware,
      revenueApiSlice.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
