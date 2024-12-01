import { customBaseQuery } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

let initialPage = 1;

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    //! GET ALL
    getUsers: builder.query<any, any>({
      query: (page = initialPage) => `/admin/users?page=${page}`,
      providesTags: ["User"],
      // transformResponse: (res: { data: TUser }) => res.data
    }),

    //! LOCK USER BY ID
    lockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/user/${userId}/lock`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    //! UNLOCK USER BY ID
    unLockUser: builder.mutation({
      query: (userId: string) => ({
        url: `/admin/user/${userId}/unlock`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  })
});

export const { useGetUsersQuery, useLockUserMutation, useUnLockUserMutation } = userSlice;