import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { courseSlice } from './slices/courseSlice'
import { profileApiSlice } from './slices/profile/profileApiSlice'
import { authApiSlice } from './slices/auth/authApiSlice'
import { checkOutApiSlice } from './slices/payment/checkoutApiSlice'
import { checkVoucherApiSlice } from './slices/voucher/checkVoucherApiSlice'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      profileApiSlice.middleware,
      courseSlice.middleware,
      checkOutApiSlice.middleware,
      checkVoucherApiSlice.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
