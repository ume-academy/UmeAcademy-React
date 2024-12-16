import { TAuthState } from "@/interfaces/TAuth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authApiSlice } from "./authApiSlice";

const initialState: TAuthState = {
  isAuthenticated: !!localStorage.getItem('access_Token'),
  accessToken: localStorage.getItem('access_Token') || '',
  refreshToken: Cookies.get('refresh_Token') || null,
  expiresIn: localStorage.getItem('expires_in') ? parseInt(localStorage.getItem('expires_in') as string) : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: TAuthState, action: PayloadAction<{ accessToken: string , refreshToken: string, expiresIn: number }>) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.expiresIn = action.payload.expiresIn
        state.isAuthenticated = true

        localStorage.setItem('access_Token', action.payload.accessToken)
        // Lưu refresh token vào cookie kèm thời gian sống
        Cookies.set('refresh_Token', state.refreshToken, {
          expires: new Date(Date.now() + state.expiresIn * 1000),  // Tính thời gian hết hạn = thời gian hiện tại + thời gian sống của token(s * 1000) 
          secure: true,                                            // Chỉ sử dụng cookie qua HTTPS
          sameSite: 'strict'                                       // Bảo vệ cookie khỏi bị tấn công CSRF               
        })
    },

    logoutLocal: (state: TAuthState) => {
      state.accessToken = ''
      state.refreshToken = ''
      state.expiresIn = null
      state.isAuthenticated = false

      localStorage.removeItem('access_Token')
      Cookies.remove('refresh_Token')
      
    }
  }
})

export const { setToken, logoutLocal } = authSlice.actions
