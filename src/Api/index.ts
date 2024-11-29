import { router } from '@/configs/routes'
import { logoutLocal } from '@/redux/slices/auth/authSlice'
import { RootState } from '@/redux/store'
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export const baseUrl = fetchBaseQuery({
  baseUrl: 'https://umeacademy.me/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  }
})

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs, // args
  any, // Result type
  FetchBaseQueryError // Error type
> = async (arg, api, extraOptions) => {
  const result = await baseUrl(arg, api, extraOptions)
  if(result.error) {
    // console.log(result.error)
    const {status} = result.error

    if(status === 401 && window.location.pathname !== `${router.search}`){
      api.dispatch(logoutLocal())
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  }

  return result
}

// export const baseQueryWithReauth = async (arg , api, extraOptions) => {

//   const apiClient = axios.create({
//     baseURL: 'https://umeacademy.me/api/v1',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })

//   const result = await baseUrl(arg, api, extraOptions)

//   //Kiểm tra lỗi 401 và thực hiện refresh token
//   if(result.error?.status === 401) {
//     try {
//       const refresh_Token = Cookies.get('refresh_Token')
//       const authorization = localStorage.getItem('access_Token')
//       if(!refresh_Token) {
//         throw new Error('Không có refresh token');
//       }

//       const res = await apiClient.post('/auth/refreshToken', {
//         Authorization: authorization,
//         Cookie: refresh_Token
//       })

//     } catch (error) {

//     }
//   }
// }
