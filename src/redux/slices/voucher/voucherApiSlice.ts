import { customBaseQuery } from '@/Api'
import { TVoucher, TVoucherForm } from '@/interfaces/TVoucher'
import { createApi } from '@reduxjs/toolkit/query/react'

export const voucherApiSlice = createApi({
  reducerPath: 'voucherApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Voucher'],
  endpoints: (builder) => ({
    checkVoucher: builder.mutation<TVoucher, { code: string; course_id: number }>({
      query: (body) => ({
        url: '/vouchers/check',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Voucher'],
      transformResponse: (res: { data: TVoucher }) => res.data
    }),

    getAllVoucherByAdmin: builder.query({
      query: ({ per_page, page }) => `/admin/voucher?per_page=${per_page}&page=${page}`,
      providesTags: ['Voucher']
    }),
    
    addVoucherByAdmin: builder.mutation<TVoucher, TVoucher>({
      query: (body) => ({
        url: '/admin/voucher',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Voucher']
    }),

    addVoucherByTeacher: builder.mutation<TVoucher, {id: number, data: TVoucherForm}>({
      query: ({id, data}) => ({
        url: `/teacher/course/${id}/vouchers`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Voucher']
    })
  })
})

export const { useCheckVoucherMutation, useAddVoucherByAdminMutation, useGetAllVoucherByAdminQuery, useAddVoucherByTeacherMutation } = voucherApiSlice
