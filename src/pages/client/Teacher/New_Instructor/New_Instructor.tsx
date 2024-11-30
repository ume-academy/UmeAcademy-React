import { router } from '@/configs/routes';
import { getTitleTab } from '@/constants/client';
import useLoading from '@/hooks/useLoading';
import { TRegisterTeacherError } from '@/interfaces/TApi_Errors/Validation_Errors_Handler';
import { useCheckTeacherQuery } from '@/redux/slices/teacher/checkIsTeacher/checkTeacherApiSlice';
import { useRegisterTeacherMutation } from '@/redux/slices/teacher/register/registerTeacherApiSlice';
import { LoadingOutlined } from "@ant-design/icons";
import { message } from 'antd';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const New_Instructor = () => {
  const nav = useNavigate();
  const { loading, startLoading, stopLoading } = useLoading();
  
  const { refetch } = useCheckTeacherQuery();
  const [register] = useRegisterTeacherMutation();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleClick = async () => {
    
    try {
      startLoading();
      const res = await register().unwrap();
      console.log(res);
      if (res.status === true) {
        message.success(res.message);
        localStorage.setItem('isTeacherHaha', 'true'); // Lưu giá trị đăng ký
        setIsRegistered(true);
        refetch();
        console.log('đã gọi lại API');
        nav(router.revenue); // Điều hướng tới trang doanh thu
      }
    } catch (error) {
      console.log(error)
      let {data} = error as TRegisterTeacherError;
      message.warning(data?.error + ' Không cần đăng ký lại');
      nav(router.revenue)
      
    } finally {
      stopLoading();
    }
  };



  return <div>
          <Helmet>
            <title>{getTitleTab('Trở thành giảng viên')}</title>
          </Helmet>
          <div className="grid grid-cols-[1fr_1fr] pt-[140px] pb-[80px] max-w-[1280px] mx-auto">
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
