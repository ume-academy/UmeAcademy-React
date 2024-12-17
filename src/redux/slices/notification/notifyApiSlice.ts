import { baseUrl } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const notifyApiSlice = createApi({
  reducerPath: "notifyApiSlice",
  baseQuery: baseUrl,
  tagTypes: ["Notify"],
  endpoints: (builder) => ({

    //! GET ALL NOTIFICATIONS FOR STUDENT
    getAllNotifyForStudent: builder.query({
      query: () => `/notifications`,
      providesTags: ["Notify"],
    }),

    //! MARK AS READ FOR STUDENT
    markAsReadNotiForStudent: builder.mutation({
      query: (notiId) => ({
        url: `/notifications/${notiId}`,
        method: 'POST'
      }),
      invalidatesTags: ["Notify"],
    }),

    //! GET ALL NOTIFICATIONS FOR TEACHER
    getAllNotifyForTeacher: builder.query({
      query: () => "/teacher/notifications",
      providesTags: ["Notify"],
    }),

    //! MARK AS READ FOR TEACHER
    markAsReadNotiForTeacher: builder.mutation({
      query: (notiId) => ({
        url: `/teacher/notifications/${notiId}`,
        method: 'POST'
      }),
      invalidatesTags: ["Notify"],
    }),
  })
});

export const {
  useGetAllNotifyForStudentQuery,
  useMarkAsReadNotiForStudentMutation,
  useGetAllNotifyForTeacherQuery,
  useMarkAsReadNotiForTeacherMutation
} = notifyApiSlice;