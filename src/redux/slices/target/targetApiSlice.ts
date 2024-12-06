import { customBaseQuery } from "@/Api";
import { TTarget } from "@/interfaces/TTarget";
import { createApi } from '@reduxjs/toolkit/query/react'


export const targetApiSlice = createApi({
  reducerPath: 'targetApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Target'],
  endpoints: (builder) => ({
    updateTarget: builder.mutation<void, TTarget>({
      query: (data) => {
        const payLoad = {
          data: {
            course_requirement: data.course_requirement.map(String),
            course_learning_benefit: data.course_learning_benefit.map(String)
          }
        }
        return {
          url: `/teacher/course/${data.id}/target-course`,
          method: 'PUT',
          body: payLoad,
        };
      },
      invalidatesTags: ['Target']
    })


  }),
})

export const { useUpdateTargetMutation } = targetApiSlice