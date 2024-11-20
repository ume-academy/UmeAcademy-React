import { combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "./slice/authApiSlice";

const rootReducer = combineReducers({
    [authApiSlice.reducerPath]: authApiSlice.reducer
})

export default rootReducer


