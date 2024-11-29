import { router } from '@/configs/routes';
import { getTitleTab } from '@/constants/client';
import useLoading from '@/hooks/useLoading';
import { selectIsTeacher } from '@/redux/selector/teacher_selector';
import { useCheckTeacherQuery } from '@/redux/slices/teacher/checkIsTeacher/checkTeacherApiSlice';
import { setIsTeacher } from '@/redux/slices/teacher/checkIsTeacher/checkTeacherSlice';
import { useRegisterTeacherMutation } from '@/redux/slices/teacher/register/registerTeacherApiSlice';
import { LoadingOutlined } from "@ant-design/icons";
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const New_Instructor = () => {
 const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, startLoading, stopLoading } = useLoading();
  const isTeacher = useSelector(selectIsTeacher);

  // Lấy trạng thái isTeacher từ API
  const { data: dataIsTeacher, isFetching: isFetchingTeacher } = useCheckTeacherQuery();
  const isTeacherApi = dataIsTeacher?.is_teacher;

  // Đăng ký làm giảng viên
  const [register] = useRegisterTeacherMutation();

  // Đồng bộ Redux với API nếu cần
  useEffect(() => {
    if (!isFetchingTeacher && isTeacherApi !== undefined && isTeacher !== isTeacherApi) {
      console.log('Kiểm tra điều kiện cập nhật từ API:', { isTeacher, isTeacherApi });
      if (isTeacherApi) {
        dispatch(setIsTeacher(isTeacherApi));
        console.log('Cập nhật isTeacher từ API vào Redux:', isTeacherApi);
      }
    }
  }, [isTeacherApi, isFetchingTeacher, isTeacher, dispatch]);

  const handleClick = async () => {
    try {
      startLoading();
      const res = await register().unwrap();
      console.log(res);
      if (res.status === true) {
        message.success('Bạn đã trở thành giảng viên!');
        dispatch(setIsTeacher(res.status)); // Cập nhật Redux
        console.log('LocalStorage sau khi dispatch:', localStorage.getItem('isTeacher'));
        
      }
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    } finally {
      stopLoading();
    }
  };

  // Lắng nghe thay đổi isTeacher để điều hướng
  useEffect(() => {
    if (isTeacher) {
      console.log('lắng nghe isTeacher:', isTeacher);
      nav(router.revenue); // Điều hướng tới trang doanh thu
    }
  }, [isTeacher, nav]);

  return <div>
          <Helmet>
            <title>{getTitleTab('Trở thành giảng viên')}</title>
          </Helmet>
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="max-w-[400px] mt-8">
              <h1 className="font-title text-[42px] leading-[60px] mb-6 dark:text-[#b9b7c0]">Tham gia giảng dạy cùng chúng tôi</h1>
              <h5 className="font-desc text-[16px] mb-10 text-[#685f78]">Chung tay đóng góp kiến thức để thay đổi cuộc sống của mọi người. Hãy cùng chia sẻ những kiến thức quý giá và góp phần giúp cộng đồng tiếp cận được những kỹ năng mới. Sự tham gia của bạn sẽ tạo ra những tác động tích cực lâu dài cho xã hội.</h5>
              {/* <h5 className="mb-4">Học - học nữa - học mãi</h5> */}
              <button 
                  className="bg-[#ff5364] text-[#fff] w-full rounded-lg py-2 border-[2px] border-transparent 
                  hover:bg-transparent hover:border-[#ff5364] hover:text-[#ff5364]" onClick={() => handleClick()} disabled={loading}>
                    {loading ? <LoadingOutlined style={{fontSize:18}} /> : 'Bắt đầu'}
              </button>
            </div>
            <div className="">
              <img className="transform scale-x-[-1]" src="https://dreamslms.dreamstechnologies.com/html/assets/img/share.png" alt="" />
            </div>
          </div>
        </div>
}

export default New_Instructor
