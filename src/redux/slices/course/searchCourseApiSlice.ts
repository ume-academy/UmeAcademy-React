import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const searchCourseApiSlice = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseUrl,
  tagTypes: ['search'],
  endpoints: (builder) => ({
    searchCourse: builder.query({
      query: ({ per_page, page, name, price_min, price_max, rating, categories, levels }) => {
        const pararms = new URLSearchParams()

        if (name) pararms.append('name', name)
        if (price_min) pararms.append('price_min', price_min)
        if (price_max) pararms.append('price_max', price_max)
        if (rating) pararms.append('rating', rating)
        if (categories) pararms.append('categories', categories)
        if (levels) pararms.append('levels', levels)

        return `/courses/search?${pararms.toString()}&per_page=${per_page}&page=${page}`
      }
      // transformResponse: (res: { data: TCourse }) => res.data
    }),
    getPriceSearch:builder.query({
      query:()=>`/course-price`
    })
  })
})

export const { useSearchCourseQuery, useGetPriceSearchQuery } = searchCourseApiSlice
