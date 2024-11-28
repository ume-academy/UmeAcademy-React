import { baseUrl } from '@/Api'
import { createApi } from '@reduxjs/toolkit/query/react'

export const searchCourseApiSlice = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseUrl,
  tagTypes: ['search'],
  endpoints: (builder) => ({
    searchCourse: builder.query({
      query: ({ per_page, page, name, price, rating, categories, levels }) => {
        const pararms = new URLSearchParams()

        if (name) pararms.append('name', name)
        if (price) pararms.append('price', price)
        if (rating) pararms.append('rating', rating)
        if (categories) pararms.append('categories', categories)
        if (levels) pararms.append('levels', levels)

        return `/courses/search?${pararms.toString()}&per_page=${per_page}&page=${page}`
      }
      // transformResponse: (res: { data: TCourse }) => res.data
    })
  })
})

export const { useSearchCourseQuery } = searchCourseApiSlice
