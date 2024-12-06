import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '@/Api'
import { TPaymentDetails } from '@/interfaces/TPayment'

export const checkOutApiSlice = createApi({
  reducerPath: 'checkOutApi',
  baseQuery: customBaseQuery,
  tagTypes: ['CheckOut'],
  endpoints: (builder) => ({
    checkOut: builder.mutation<
      TPaymentDetails,
      { voucher_id: number; origin_price: number; course_id: number; payment_method_id: number }
    >({
      query: (body) => ({
        url: '/checkout',
        method: 'POST',
        body
      }),
      invalidatesTags: ['CheckOut']
      // transformResponse: (res: { data: TPaymentDetails }) => res,
    })
  })
})

export const { useCheckOutMutation } = checkOutApiSlice
