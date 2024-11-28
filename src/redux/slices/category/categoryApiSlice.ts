import { baseUrl } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoryApiSlice = createApi({
  reducerPath:"categoryApi",
  baseQuery:baseUrl,
  tagTypes:["category"],
  endpoints:(builder)=>({
    getAllCategory: builder.query({
      query:()=>`/categories`
    })
  })
})

export const {useGetAllCategoryQuery} = categoryApiSlice