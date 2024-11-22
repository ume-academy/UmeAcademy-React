

import { selectIsAuthenticated } from '@/redux/selector/auth_selector';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

 const PriveteRouteStudent = ({children} : {children: JSX.Element}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return !isAuthenticated ?  <Navigate to='/login' /> : children
}

export default PriveteRouteStudent;

