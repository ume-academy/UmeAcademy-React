import { customBaseQuery } from "@/Api";
import { TFormChapter } from "@/interfaces/TLesson";
import { createApi } from "@reduxjs/toolkit/query/react";


export const chapterApiSlice = createApi({
  reducerPath: 'chapterApiSlice',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({

    createChapter: builder.mutation<void , {id_course:number, name:string}>({
      query: ({id_course, name}) => {
        console.log(name, id_course)
        return {
          url: `/teacher/course/${id_course}/chapters`,
          method: 'POST',
          body: {name}
        }
      }
    }),

    updateChapter: builder.mutation<void , {id_course:number, id_chapter:number, name:string}>({
      query: ({id_course,id_chapter, name}) => {
        console.log(name, id_course)
        return {
          url: `/teacher/course/${id_course}/chapter/${id_chapter}`,
          method: 'PUT',
          body: {name}
        }
      }
    }),

    removeChapter: builder.mutation<void , {id_course:number, chapter: TFormChapter}>({
      query: ({id_course, chapter}) => {
        return {
          url: `/teacher/course/${id_course}/chapter/${chapter.id}`,
          method: 'DELETE',
        }
      }
    })


  })
})

export const { useCreateChapterMutation, useUpdateChapterMutation, useRemoveChapterMutation } = chapterApiSlice