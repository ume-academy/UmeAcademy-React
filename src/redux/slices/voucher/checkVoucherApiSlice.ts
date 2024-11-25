import { baseUrl } from '@/Api'
import { TVoucher } from '@/interfaces/TVoucher'
import { createApi } from '@reduxjs/toolkit/query/react'

export const checkVoucherApiSlice = createApi({
  reducerPath: 'voucherApi',
  baseQuery: baseUrl,
  tagTypes: ['Voucher'],
  endpoints: (builder) => ({
    checkVoucher: builder.mutation<TVoucher,{ code: string; course_id: number }>({
      query: (body) => ({
        url: '/vouchers/check',
        method: 'POST',
        body
      }),
      invalidatesTags:['Voucher'],
      transformResponse: (res : { data: TVoucher }) => res.data
    })
  })
})

export const {useCheckVoucherMutation} = checkVoucherApiSlice