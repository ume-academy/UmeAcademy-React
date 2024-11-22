import { baseUrl } from "@/Api";
import { TLearningContent } from "@/interfaces/TLesson";
import { createApi } from "@reduxjs/toolkit/query/react";
import { get } from "http";


export const lessonApiSlice = createApi({
  reducerPath: 'lessonApiSlice',
  baseQuery: baseUrl,
  endpoints: (builder) => ({

    getLessonByCourseId: builder.query<TLearningContent , number>({
      query: (courseId: number) => `/learning/course/${courseId}/content`,
      transformResponse: (res: { data: TLearningContent }) => res.data
    })

  })
})

export const { useGetLessonByCourseIdQuery } = lessonApiSlice