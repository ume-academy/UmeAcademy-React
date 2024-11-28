import { customBaseQuery } from "@/Api";
import { TLogin, TRegister, TResponseLogin } from "@/interfaces/TAuth";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const  authApiSlice = createApi({
  reducerPath: 'authApiSlice',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({

    register: builder.mutation<TRegister , Omit<TRegister, 'confirmPassword'>>({
      query: (data: Omit<TRegister, 'confirmPassword'>) => ({
        url: '/auth/register/email',
        method: 'POST',
        body: data
      })
    }),

    login: builder.mutation<TResponseLogin, TLogin>({
      query: (data: TLogin) => ({
        url: '/auth/login/email',
        method: 'POST',
        body: data
      })
    }),

    logoutApi: builder.mutation<void, void>({
      query: () => {
        const refresh_Token =  Cookies.get('refresh_Token')
        return { 
          url: '/auth/logout',
          method: 'POST',
          body: `refresh_token=${refresh_Token}`
        }
      }
    })

  })
})


export const { useRegisterMutation, useLoginMutation, useLogoutApiMutation } = authApiSlice