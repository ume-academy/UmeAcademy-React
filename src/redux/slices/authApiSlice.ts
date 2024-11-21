import { baseUrl } from "@/Api";
import { TRegister } from "@/interfaces/TAuth";
import { createApi } from "@reduxjs/toolkit/query/react";

export const  authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: baseUrl,
  endpoints: (builder) => ({
    register: builder.mutation<TRegister , Omit<TRegister, 'confirmPassword'>>({
      query: (data: Omit<TRegister, 'confirmPassword'>) => ({
        url: '/auth/register/email',
        method: 'POST',
        body: data
      })
    })
  })
})


export const { useRegisterMutation } = authApiSlice