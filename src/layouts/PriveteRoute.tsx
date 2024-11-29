import useRedirectToPurchase from '@/hooks/useRedirectToPurchase';
import { selectIsAuthenticated } from '@/redux/selector/auth_selector';
import { selectIsTeacher } from '@/redux/selector/teacher_selector';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { get } from 'http';
import { message } from 'antd';
import { setIsTeacher } from '@/redux/slices/teacher/checkIsTeacher/checkTeacherSlice';



export const PrivateRouteStudent = ({ children }: { children: JSX.Element }) => {
  const { isEnrolled } = useRedirectToPurchase();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Navigate to='/login' />;

  // Nếu chưa tham gia khóa học, chuyển hướng đến trang thanh toán
  // if (!isEnrolled) return <Navigate to={'/forbidden'} />

  return children;
};

export const PriveteRouteAdmin = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true); // Thêm loading state để xử lý sự đồng bộ
  const nav = useNavigate();
  const isTeacher = useSelector(selectIsTeacher);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const isTeacherLocalStored = localStorage.getItem('isTeacher');
    if (isTeacherLocalStored) {
      const parsedIsTeacher = JSON.parse(isTeacherLocalStored);
      console.log("lấy isTeacher from localStorage vào privatedRoute:", parsedIsTeacher);
      dispatch(setIsTeacher(parsedIsTeacher));
    }
    setLoading(false);
  }, [dispatch]);

  // Kiểm tra trạng thái và điều hướng bên trong useEffect
  useEffect(() => {
    if (loading) return; // Nếu đang loading thì không làm gì
    
    // Kiểm tra và điều hướng sau khi khôi phục state
    if (isTeacher === false && location.pathname !== '/teacher/new-instructor') {
      nav('/teacher/new-instructor');
      nav('/teacher');
    }
  }, [isTeacher, location, nav, loading]); // Đảm bảo rằng loading được xử lý
  return !loading ? children : null;
};