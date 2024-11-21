import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { authApiSlice } from './slice/authApiSlice'
import { profileApiSlice } from './slice/profile/profileApiSlice'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware, profileApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
