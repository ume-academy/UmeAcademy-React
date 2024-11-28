import { customBaseQuery } from "@/Api";
import { TLearningContent, TLessonCompleted } from "@/interfaces/TLesson";
import { createApi } from "@reduxjs/toolkit/query/react";
import { get } from "http";


export const lessonApiSlice = createApi({
  reducerPath: 'lessonApiSlice',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({

    getLessonByCourseId: builder.query<TLearningContent , number>({
      query: (courseId: number) => `/learning/course/${courseId}/content`,
      transformResponse: (res: { data: TLearningContent }) => res.data
    }),

    postCompletedLesson: builder.mutation({
      query: ({id_Chapter, id_Course, id_Lesson}: TLessonCompleted ) => ({
        url: `/learning/course/${id_Course}/chapter/${id_Chapter}/lesson/${id_Lesson}/complete`,
        method: 'POST'
      })
        
    })
  })
})

export const { useGetLessonByCourseIdQuery, usePostCompletedLessonMutation } = lessonApiSlice