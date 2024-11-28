import { customBaseQuery } from "@/Api";
import { TIsTeacher } from "@/interfaces/TTeacher";
import { createApi } from "@reduxjs/toolkit/query/react";


export const checkTeacherApiSlice = createApi({
  reducerPath: 'checkTeacherApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    checkTeacher: builder.query<TIsTeacher, void>({
      query: () => {
        return {
          url: '/teachers/check',
          method: 'POST'
        }
      }

    })
  })
})

export const { useCheckTeacherQuery } = checkTeacherApiSlice