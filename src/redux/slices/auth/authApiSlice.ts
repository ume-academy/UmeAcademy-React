import { baseUrl } from "@/Api";
import { TLogin, TRegister, TResponseLogin } from "@/interfaces/TAuth";
import { createApi } from "@reduxjs/toolkit/query/react";

export const  authApiSlice = createApi({
  reducerPath: 'authApiSlice',
  baseQuery: baseUrl,
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

    // refreshToken: builder.mutation<TResponseLogin, string>({
    //   query: (refreshToken: string) => ({
    //     url: '/auth/refreshToken',
    //     method: 'POST',
    //     body: refreshToken
    //   })
    // }) useRefreshTokenMutation

  })
})


export const { useRegisterMutation, useLoginMutation } = authApiSlice