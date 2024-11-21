import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { courseSlice } from "./slices/courseSlice";
import { profileApiSlice } from './slices/profile/profileApiSlice';
import { authApiSlice } from './slices/auth/authApiSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware, profileApiSlice.middleware, courseSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
