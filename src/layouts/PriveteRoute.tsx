import useRedirectToPurchase from '@/hooks/useRedirectToPurchase';
import { selectIsAuthenticated } from '@/redux/selector/auth_selector';
import { useCheckTeacherQuery } from '@/redux/slices/teacher/checkIsTeacher/checkTeacherApiSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';



export const PrivateRouteStudent = ({ children }: { children: JSX.Element }) => {
  const { isEnrolled } = useRedirectToPurchase();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) return <Navigate to='/login' />;

  // Nếu chưa tham gia khóa học, chuyển hướng đến trang thanh toán
  // if (!isEnrolled) return <Navigate to={'/forbidden'} />

  return children;
};

export const PriveteRouteAdmin = ({ children }: { children: JSX.Element }) => {

      // Sử dụng hook để lấy dữ liệu từ API, bao gồm trạng thái, dữ liệu và các hàm như `refetch`.
      const { data: dataIsTeacher, isLoading, error, refetch, isFetching } = useCheckTeacherQuery(undefined, { skip: false });
      const isTeacherApi = dataIsTeacher?.is_teacher;
      // State để xác định đã gọi `refetch` hay chưa. 
      const [hasRefetched, setHasRefetched] = React.useState(false);

      // Xử lý trạng thái loading hoặc fetching
      if (isLoading || isFetching) {
        return <div>Loading...</div>;
      }

      if (error) {
        return <div>Error loading data</div>;
      }

      // Nếu không phải teacher (`isTeacherApi === false`) và chưa từng gọi `refetch`.
      if (isTeacherApi === false && !hasRefetched) {
        setHasRefetched(true); // Đặt trạng thái đã gọi `refetch` để tránh gọi lại nhiều lần.
        refetch();            // Gọi lại API để kiểm tra dữ liệu mới nhất.
        return null;          // Dừng render UI tạm thời trong lúc fetch lại dữ liệu.
      }

      // Nếu không phải teacher (`isTeacherApi === false`) sau khi đã refetch xong, điều hướng sang trang `/new-instructor`.
      if (isTeacherApi === false) {
        console.log("Redirecting to /new-instructor...");
        return <Navigate to="/new-instructor" />;
      } 

      console.log('chuyển hướng đến children');
      return children; // Render component con nếu `isTeacherApi` là `true`.
};
