import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { profileApiSlice } from './slices/profile/profileApiSlice'
import { authApiSlice } from './slices/auth/authApiSlice'
import { lessonApiSlice } from './slices/lesson/lessonApiSlice'
import { courseSlice } from './slices/course/courseSlice'
import { checkOutApiSlice } from './slices/payment/checkOutApiSlice'
import { checkVoucherApiSlice } from './slices/voucher/checkVoucherApiSlice'
import { userSlice } from './slices/user/userSlice'
import { paymentMethodApiSlice } from './slices/payment_method/paymentMethodApiSlice'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      profileApiSlice.middleware,
      courseSlice.middleware,
      lessonApiSlice.middleware,
      checkOutApiSlice.middleware,
      checkVoucherApiSlice.middleware,
      userSlice.middleware,
      paymentMethodApiSlice.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
