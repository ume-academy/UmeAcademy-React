import useRedirectToPurchase from '@/hooks/useRedirectToPurchase';
import { selectIsAuthenticated } from '@/redux/selector/auth_selector';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouteStudent = ({ children }: { children: JSX.Element }) => {
  const { isEnrolled } = useRedirectToPurchase();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Navigate to='/login' />;

  // Nếu chưa tham gia khóa học, chuyển hướng đến trang thanh toán
  if (!isEnrolled) return <Navigate to={'/forbidden'} />

  return children;
};

export default PrivateRouteStudent;
