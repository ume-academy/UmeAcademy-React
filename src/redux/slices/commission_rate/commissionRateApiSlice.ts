import { customBaseQuery } from "@/Api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const commissionRateApiSlice = createApi({
  reducerPath: "commissionRateApi",
  baseQuery: customBaseQuery,
  tagTypes: ["CommissionRate"],
  endpoints: (builder) => ({
    
    //! GET ONE
    getCommissionRate: builder.query({
      query: (commissionRateId: any) => `/admin/fee/${commissionRateId}`,
      providesTags: ["CommissionRate"], 
    }),

    //! UPDATE
    updateCommissionRate: builder.mutation({
      query: (body) => ({
        url: `/admin/fee/${body.feeId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["CommissionRate"]
    }),

    //? TEACHER

    //! GET ONE BY ID TEACHER
    getCommissionRateTeacherById: builder.query({
      query: (teacherId) => `/admin/fee/teacher/${teacherId}`,
      providesTags: ["CommissionRate"]
    }),

    //! UPDATE BY ID TEACHER
    updateCommissionRateTeacher: builder.mutation({
      query: (dataForm) => ({
        url: `/admin/fee/teacher/${dataForm.id}`,
        method: "POST",
        body: dataForm
      }),
      invalidatesTags: ["CommissionRate"]
    })
  })
})

export const { 
  useGetCommissionRateQuery, 
  useUpdateCommissionRateMutation,
  useGetCommissionRateTeacherByIdQuery,
  useUpdateCommissionRateTeacherMutation
} = commissionRateApiSlice;