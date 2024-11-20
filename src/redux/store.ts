import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApiSlice } from "./slice/authApiSlice";


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

