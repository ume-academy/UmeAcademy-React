import { baseUrl } from "@/Api";
import { TUser } from "@/interfaces/TUser";
import { createApi } from "@reduxjs/toolkit/query/react";

let initialPage = 1;

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseUrl,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<any, any>({
      query: (page = initialPage) => `/admin/users?page=${page}`,
      providesTags: ["User"],
      // transformResponse: (res: { data: TUser }) => res.data
    }),

  })
});

export const { useGetUsersQuery} = userSlice;