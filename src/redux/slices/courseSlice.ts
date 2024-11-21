import { baseUrl } from "@/Api";
import { TCourse } from "@/interfaces/TCourse";
import { createApi } from "@reduxjs/toolkit/query/react";

export const courseSlice = createApi({
    reducerPath: 'courseDetailApi',
    baseQuery: baseUrl,
    tagTypes: ["CourseDetail"],
    endpoints: (builder) => ({

        //! GET INFO COURSE BY ID
        getInfoCourseById: builder.query({
            query: (courseId) => `/course/${courseId}/information`,
            providesTags: ["CourseDetail"],
            transformResponse: (res: { data: TCourse }) => res.data
        }),

        // ! GET CONTENT COURSE BY ID
        getContentCourseById: builder.query({
            query: (courseId) => `/course/${courseId}/content`
        }),

        // ! GET REVIEWS COURSE BY ID
        getReviewsCourseById: builder.query({
            query: (courseId) => `/course/${courseId}/reviews`,
            providesTags: ["CourseDetail"]
        }),
    })
});

export const { useGetInfoCourseByIdQuery, useGetContentCourseByIdQuery, useGetReviewsCourseByIdQuery } = courseSlice
