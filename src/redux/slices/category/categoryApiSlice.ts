import { baseUrl } from "@/Api";
import { TCategory } from "@/interfaces/TCategory";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoryApiSlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseUrl,
  tagTypes: ["Category"],
  endpoints: (builder) => ({

    //! GET ALL
    getAllCategory: builder.query({
      query: (page?: any) => `/categories/?page=${page}`,
      providesTags: ["Category"]
    }),

    //! GET ONE BY ID
    getOneCategory: builder.query({
      query: (categoryId: any) => `admin/categories/${categoryId}`,
      providesTags: ["Category"]
    }),

    //! REMOVE BY ID
    removeCategory: builder.mutation({
      query: (categoryId: string | number) => ({
        url: `/admin/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"]
    }),

    //! CREATE ONE
    createCategory: builder.mutation({
      query: (dataForm: TCategory) => ({
        url: `/admin/categories`,
        method: "POST",
        body: dataForm
      }),
      invalidatesTags: ["Category"]
    }),

    updateCategory: builder.mutation({
      query: (dataForm: any) => ({
        url: `/admin/categories/${dataForm.id}`,
        method: "POST",
        body: dataForm
      }),
      invalidatesTags: ["Category"]
    })
  })
})

export const { 
  useGetAllCategoryQuery, 
  useGetOneCategoryQuery, 
  useRemoveCategoryMutation, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation 
} = categoryApiSlice