import useRedirectToPurchase from '@/hooks/useRedirectToPurchase';
import { selectIsAuthenticated } from '@/redux/selector/auth_selector';
import { selectIsTeacher } from '@/redux/selector/teacher_selector';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { get } from 'http';
import { setIsTeacher } from '@/redux/slices/teacher/check_teacher/checkTeacherSlice';
import { message } from 'antd';



export const PrivateRouteStudent = ({ children }: { children: JSX.Element }) => {
  const { isEnrolled } = useRedirectToPurchase();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Navigate to='/login' />;

  // Nếu chưa tham gia khóa học, chuyển hướng đến trang thanh toán
  // if (!isEnrolled) return <Navigate to={'/forbidden'} />

  return children;
};

export const PriveteRouteAdmin = ({children} : {children: JSX.Element}) => {
  const nav = useNavigate()
  const isTeacher = useSelector(selectIsTeacher)
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    const isTeacherLocalStored = localStorage.getItem('isTeacher')
    if(isTeacherLocalStored){
      dispatch(setIsTeacher(JSON.parse(isTeacherLocalStored)))
    }
  }, [dispatch])

  // Kiểm tra trạng thái và điều hướng bên trong useEffect
  useEffect(() => {
    if (isTeacher === false && location.pathname !== '/teacher/new-instructor') {
      nav('/teacher/new-instructor');
    } else if (isTeacher !== false && location.pathname === '/teacher/new-instructor') {
      nav('/teacher');
    }
  }, [isTeacher, location, nav]); // Điều hướng khi isTeacher hoặc location thay đổi

  // Trả về children bình thường nếu không cần điều hướng
  return children;
}
