import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrl } from '@/Api'
import { TPaymentDetails } from '@/interfaces/TPayment'

export const checkOutApiSlice = createApi({
  reducerPath: 'checkOutApi',
  baseQuery: baseUrl, 
  tagTypes: ['CheckOut'], 
  endpoints: (builder) => ({
    checkOut: builder.mutation<TPaymentDetails, TPaymentDetails>({
      query: (body) => ({
        url: '/checkout',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CheckOut'], 
      // transformResponse: (res: { data: TPaymentDetails }) => res, 
    }),
  }),
});

export const { useCheckOutMutation } = checkOutApiSlice;
