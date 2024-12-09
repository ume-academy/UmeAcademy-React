import { customBaseQuery } from '@/Api'
import { TFormLesson, TLearningContent, TLessonCompleted } from '@/interfaces/TLesson'
import { createApi } from '@reduxjs/toolkit/query/react'

export const lessonApiSlice = createApi({
  reducerPath: 'lessonApiSlice',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getLessonByCourseId: builder.query<TLearningContent, number>({
      query: (courseId: number) => `/learning/course/${courseId}/content`,
      transformResponse: (res: { data: TLearningContent }) => res.data
    }),

    postCompletedLesson: builder.mutation({
      query: ({ id_Chapter, id_Course, id_Lesson }: TLessonCompleted) => ({
        url: `/learning/course/${id_Course}/chapter/${id_Chapter}/lesson/${id_Lesson}/complete`,
        method: 'POST'
      })
    }),

    createLesson: builder.mutation<void, { id_course: number; id_chapter: number; lesson: TFormLesson }>({
      query: ({ id_course, id_chapter, lesson }) => {
        console.log(name, id_course)
        return {
          url: `/teacher/course/${id_course}/chapter/${id_chapter}/lessons`,
          method: 'POST',
          body: { name: lesson.name }
        }
      }
    }),

    updateLesson: builder.mutation<void, { id_course: number; id_chapter: number; lesson: TFormLesson }>({
      query: ({ id_course, id_chapter, lesson }) => {
        console.log(name, id_course)
        return {
          url: `/teacher/course/${id_course}/chapter/${id_chapter}/lesson/${lesson.id}`,
          method: 'PUT',
          body: { name: lesson.name }
        }
      }
    })
  })
})

export const { 
  useGetLessonByCourseIdQuery, 
  usePostCompletedLessonMutation, 
  useCreateLessonMutation,
  useUpdateLessonMutation
 } = lessonApiSlice
