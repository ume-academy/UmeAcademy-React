import { baseUrl } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const favoriteCourseApiSlice = createApi({
  reducerPath: "favoriteCourseApi",
  baseQuery: baseUrl,
  tagTypes: ["FavoriteCourse"],
  endpoints: (builder) => ({
    getAllFavoriteCourses: builder.query({
      query: () => `/course/wishlist`,
      providesTags: ["FavoriteCourse"],
    }),
  })
})

export const { useGetAllFavoriteCoursesQuery } = favoriteCourseApiSlice