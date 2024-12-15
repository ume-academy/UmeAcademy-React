import { router } from '@/configs/routes'
import { logoutLocal } from '@/redux/slices/auth/authSlice'
import { RootState } from '@/redux/store'
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export const baseUrl = fetchBaseQuery({
  baseUrl: 'https://umeacademy.me/api/v1',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    // const UPLOAD_ENDPOINTS = ['uploadEndpoint1', 'uploadEndpoint2'];
    //  if (!UPLOAD_ENDPOINTS.includes(endpoint)) {
    //     // Nếu là endpoint upload, không set Content-Type vì FormData sẽ tự động thêm nó
    //   return headers;
    //   }
    // headers.set('content-type', 'application/json');
    // return headers
  }
})

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (arg, api, extraOptions) => {
  const result = await baseUrl(arg, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    if (status === 401) {
      const currentPath = window.location.pathname;

      // Kiểm tra lỗi đến từ màn hình login
      const isLoginRequest = currentPath === '/login'; // Đường dẫn login
  
      if (isLoginRequest) {
        // Không điều hướng, chỉ xử lý lỗi đăng nhập sai
        return result;
      }

      // Các đường dẫn hoặc trang được phép truy cập mà không cần xác thực
      const publicPaths = ['/courses', '/about', '/contact'];

      // Kiểm tra xem có nằm trong danh sách public không
      const isPublicPage = publicPaths.some(path => currentPath.startsWith(path));
      
      // Nếu trang hiện tại là public, bỏ qua lỗi 401
      if (isPublicPage) {
        return result;
      }

      // Nếu là trang cần xác thực, xử lý logout và redirect
      api.dispatch(logoutLocal());

      // Tránh redirect liên tục bằng cách kiểm tra đường dẫn
      if (currentPath !== '/') {
        window.location.href = '/';
      }
    }
  }

  return result;
};


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
