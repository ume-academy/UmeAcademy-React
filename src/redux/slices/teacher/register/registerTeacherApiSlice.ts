import { customBaseQuery } from "@/Api";
import { TRegisterTeacher } from "@/interfaces/TTeacher";
import { createApi } from "@reduxjs/toolkit/query/react";


export const registerTeacherApiSlice = createApi({
  reducerPath: 'registerTeacher',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    registerTeacher: builder.mutation<TRegisterTeacher, void>({
      query: () => ({
        url: '/teachers/register',
        method: 'POST',
      }),
    }),


  }),
})

export const { useRegisterTeacherMutation } = registerTeacherApiSlice